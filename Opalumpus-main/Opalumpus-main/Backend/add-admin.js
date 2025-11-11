import dotenv from 'dotenv';
import mongoose from 'mongoose';
import adminModel from './models/adminModel.js';

// Load env
dotenv.config();

async function main() {
  const username = process.argv[2] || 'admin';
  const password = process.argv[3] || 'admin123';

  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not set in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existing = await adminModel.findOne({ username });
    if (existing) {
      console.log(`Admin user "${username}" already exists.`);
    } else {
      await adminModel.create({ username, password });
      console.log(`Admin user "${username}" created with provided password.`);
      console.log('Note: password is stored as plain text by current model. Consider hashing in production.');
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err.message || err);
    process.exit(1);
  }
}

main();
