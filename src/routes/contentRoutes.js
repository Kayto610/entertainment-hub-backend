import express from 'express';
import { getContents, getContentById } from '../controllers/contentController.js';
import { addReview } from '../controllers/reviewController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Endpoint: GET /api/contents (Mengambil semua konten, filter kategori, dan pencarian)
router.get('/', getContents);

// Endpoint: GET /api/contents/:id (Mengambil detail satu konten beserta daftar ulasannya)
router.get('/:id', getContentById);

// Endpoint: POST /api/contents/:id/reviews (Mengirim ulasan & rating, wajib login / butuh token)
router.post('/:id/reviews', protect, addReview);

export default router;