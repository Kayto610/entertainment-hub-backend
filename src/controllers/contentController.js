import { Content } from '../models/Content.js';
import { Review } from '../models/Review.js';

export const getContents = async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (search && search.trim() !== '') {
      filter.title = { $regex: search.trim(), $options: 'i' };
    }

    const contents = await Content.find(filter).sort({ createdAt: -1 });
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findById(id);

    if (!content) {
      return res.status(404).json({ message: 'Konten tidak ditemukan' });
    }

    const reviews = await Review.find({ contentId: id }).sort({ createdAt: -1 });

    res.status(200).json({
      content,
      reviews,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};