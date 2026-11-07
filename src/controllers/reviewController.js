import { Review } from '../models/Review.js';
import { Content } from '../models/Content.js';

export const addReview = async (req, res) => {
  try {
    const { id: contentId } = req.params;
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ message: 'Rating dan komentar wajib diisi' });
    }

    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ message: 'Konten tidak ditemukan' });
    }

    const newReview = await Review.create({
      userId: req.user.id,
      userName: req.user.name,
      contentId,
      rating: Number(rating),
      comment: comment.trim(),
    });

    // Hitung rata-rata rating terbaru
    const allReviews = await Review.find({ contentId });
    const totalScore = allReviews.reduce((acc, curr) => acc + curr.rating, 0);
    const avgRating = totalScore / allReviews.length;

    content.rating = Number(avgRating.toFixed(1));
    content.reviewsCount = allReviews.length;
    await content.save();

    res.status(201).json({
      message: 'Ulasan berhasil ditambahkan',
      review: newReview,
      updatedContent: content,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};