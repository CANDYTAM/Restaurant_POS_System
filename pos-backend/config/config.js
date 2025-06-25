require("dotenv").config();

const config = Object.freeze({
    port: process.env.PORT || 8000,
    // databaseURI: process.env.MONGODB_URI || "mongodb://localhost:27017/pos-db",
    databaseURI: process.env.MONGODB_URI || "mongodb+srv://admin:admin123@cluster0.0tdi1yy.mongodb.net/pos-system?retryWrites=true&w=majority",
    nodeEnv : process.env.NODE_ENV || "development",
    accessTokenSecret: process.env.JWT_SECRET,
    razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    razorpaySecretKey: process.env.RAZORPAY_KEY_SECRET,
    razorpyWebhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET
});

module.exports = config;
