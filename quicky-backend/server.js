// server.js
// This server handles user authentication, Razorpay order creation, and saves/retrieves orders from MongoDB.

// --- 1. Import Dependencies ---
require('dotenv').config(); // Must be at the very top
const express = require('express');
const mongoose = require('mongoose');
const cors =require('cors');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- 2. Initialize Express App ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- 3. Middleware Setup ---
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// --- 4. Initialize Razorpay ---
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// --- 5. MongoDB Connection ---
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/quickyDB';
mongoose.connect(dbURI)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// --- 6. Define Schemas ---

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true }, // Added phone field
});

// Pre-save hook to hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    customerDetails: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
    },
    items: [{ name: String, quantity: Number, price: Number }],
    totalAmount: { type: Number, required: true },
    razorpay_order_id: { type: String, required: true },
    razorpay_payment_id: { type: String, required: true },
    razorpay_signature: { type: String, required: true },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Processing', 'Confirmed', 'Out for Delivery', 'Delivered', 'Cancelled'], default: 'Processing' },
    deliveryPartner: { type: String, default: null },
    assignedAt: { type: Date, default: null }
});

const Order = mongoose.model('Order', orderSchema);


// --- 7. Authentication Middleware ---
const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }
    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid.' });
    }
};


// --- 8. API Endpoints (Routes) ---

// --- AUTHENTICATION ROUTES ---
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body; // Added phone
        if (!name || !email || !password || !phone) { // Added phone validation
            return res.status(400).json({ message: 'Please enter all fields.' });
        }
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }
        user = new User({ name, email, password, phone }); // Added phone
        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).send('Server error during registration.');
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all fields.' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        const payload = { 
            user: { 
                id: user.id, 
                name: user.name,
                email: user.email,
                phone: user.phone // Added phone to payload
            } 
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: payload.user });
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).send('Server error during login.');
    }
});


// --- ORDER & PAYMENT ROUTES ---
app.post('/api/create-order', async (req, res) => {
    const { amount, currency } = req.body;
    const options = { amount: amount * 100, currency, receipt: `receipt_order_${new Date().getTime()}` };
    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).send('Server error while creating order');
    }
});

app.post('/api/payment-verification', authMiddleware, async (req, res) => {
    const { razorpayDetails, orderDetails } = req.body;
    const body = razorpayDetails.razorpay_order_id + "|" + razorpayDetails.razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest('hex');

    if (expectedSignature === razorpayDetails.razorpay_signature) {
        try {
            const newOrder = new Order({
                userId: req.user.id, // Get userId securely from the token
                customerDetails: orderDetails.customerDetails,
                items: orderDetails.items,
                totalAmount: orderDetails.totalAmount,
                razorpay_order_id: razorpayDetails.razorpay_order_id,
                razorpay_payment_id: razorpayDetails.razorpay_payment_id,
                razorpay_signature: razorpayDetails.razorpay_signature
            });
            const savedOrder = await newOrder.save();
            res.status(201).json({ success: true, message: 'Payment successful and order saved!', order: savedOrder });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to save order.' });
        }
    } else {
        res.status(400).json({ success: false, message: 'Payment verification failed.' });
    }
});

app.post('/api/orders/assign-partner', authMiddleware, async (req, res) => {
    const { orderId, partnerName } = req.body;
    try {
        const lastOrder = await Order.findOne({ deliveryPartner: partnerName }).sort({ assignedAt: -1 });
        const twentyMinutesAgo = new Date(Date.now() - 20 * 60 * 1000);
        if (lastOrder && lastOrder.assignedAt > twentyMinutesAgo) {
            return res.json({ success: false, message: `${partnerName} is busy.` });
        }
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { deliveryPartner: partnerName, assignedAt: new Date() }, { new: true });
        res.json({ success: true, message: `Assigned ${partnerName}.`, order: updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

app.put('/api/orders/:orderId/status', authMiddleware, async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['Processing', 'Confirmed', 'Out for Delivery', 'Delivered', 'Cancelled'];
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status provided.' });
        }
        const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, { status: status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: 'Order not found.' });
        }
        res.json({ success: true, message: `Order status updated to ${status}`, order: updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error while updating status.' });
    }
});

app.get('/api/orders', authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).sort({ orderDate: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching orders.' });
    }
});

// --- 9. Start the Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
