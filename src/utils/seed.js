import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Content } from '../models/Content.js';

// Muat file .env secara absolut dari root folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const dummyContents = [
  {
    title: 'The Bear',
    category: 'TV Series',
    genre: ['Comedy', 'Drama'],
    releaseYear: 2023,
    posterUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80',
    trailerUrl: 'https://www.youtube.com/watch?v=y-c1aWbI0f8',
    description: 'Seorang koki muda dari dunia kuliner mewah kembali ke Chicago untuk mengelola toko roti lapis daging sapi milik keluarganya.',
    rating: 4.8,
    reviewsCount: 1,
  },
  {
    title: 'Dune: Part Two',
    category: 'Movie',
    genre: ['Action', 'Sci-Fi'],
    releaseYear: 2024,
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80',
    trailerUrl: 'https://www.youtube.com/watch?v=Way9Dexny3w',
    description: 'Paul Atreides bersatu dengan Chani dan suku Fremen untuk membalas dendam kepada para konspirator yang menghancurkan keluarganya.',
    rating: 4.9,
    reviewsCount: 2,
  },
  {
    title: 'Midnights',
    category: 'Music',
    genre: ['Pop', 'Synth-pop'],
    releaseYear: 2022,
    posterUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80',
    trailerUrl: 'https://www.youtube.com/watch?v=b1kbLwvqugk',
    description: 'Perjalanan musik melalui malam tanpa tidur, menghadapi ketakutan dan impian manis.',
    rating: 4.7,
    reviewsCount: 1,
  },
  {
    title: 'Severance',
    category: 'TV Series',
    genre: ['Sci-Fi', 'Thriller'],
    releaseYear: 2022,
    posterUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80',
    trailerUrl: 'https://www.youtube.com/watch?v=xEQP4VVuyrY',
    description: 'Mark memimpin tim pekerja kantor yang ingatannya telah dipisahkan melalui prosedur bedah antara pekerjaan dan kehidupan pribadi.',
    rating: 4.7,
    reviewsCount: 1,
  },
];

const seedData = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI tidak terdefinisi di process.env");
    }
    await mongoose.connect(uri);
    await Content.deleteMany();
    await Content.insertMany(dummyContents);
    console.log('Dummy Data Film & Musik Berhasil Dimasukkan ke MongoDB Atlas!');
    process.exit(0);
  } catch (error) {
    console.error('Error saat seeding data:', error.message);
    process.exit(1);
  }
};

seedData();