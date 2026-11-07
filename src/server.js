import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import contentRoutes from './routes/contentRoutes.js';

dotenv.config();

// Koneksi ke MongoDB Atlas
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Daftarkan Routes
app.use('/api/auth', authRoutes);
app.use('/api/contents', contentRoutes);

// Route Root / Health Check
app.get('/', (req, res) => {
  res.send('Entertainment Hub API is running...');
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export instance app untuk handler serverless Vercel
export default app;