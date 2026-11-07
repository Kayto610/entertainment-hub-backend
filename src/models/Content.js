import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Movie', 'TV Series', 'Music'],
      required: true,
    },
    genre: [
      {
        type: String,
      },
    ],
    releaseYear: {
      type: Number,
      required: true,
    },
    posterUrl: {
      type: String,
      required: true,
    },
    trailerUrl: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Content = mongoose.model('Content', contentSchema);