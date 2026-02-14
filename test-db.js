import mongoose from 'mongoose';
import 'dotenv/config';

console.log('Testing MongoDB Connection...');
console.log('URI:', process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':****@')); // Hide password

try {
    await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000 // 5 second timeout
    });
    console.log('✅ Success! Connected to MongoDB Atlas');
    process.exit(0);
} catch (error) {
    console.error('❌ Connection Failed:', error.message);
    if (error.reason) console.error('Reason:', error.reason);
    process.exit(1);
}
