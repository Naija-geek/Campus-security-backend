const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./utils/db');
const authRoutes = require('./routes/authRoutes');
const personnelRoutes = require('./routes/personnelRoutes');
const dutyAssignmentRoutes = require('./routes/dutyAssignmentRoutes');
const leaveRequestRoutes = require('./routes/leaveRequestRoutes');
const userRoutes = require('./routes/userRoutes');
const loanRequestRoutes = require('./routes/loanRequestRoutes');
const overtimeRequestRoutes = require('./routes/overtimeRequestRoutes');
const dutyPostRoutes = require('./routes/dutyPostRoutes');

dotenv.config();
connectDB();

const app = express();



const allowedOrigins = [
  'http://localhost:3000',             // local React dev
  'http://localhost:5173',             // local Vite dev
  'https://campus-security-five.vercel.app',  // ✅ production frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 },
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/personnel', personnelRoutes);
app.use('/api/duty-assignments', dutyAssignmentRoutes);
app.use('/api/leave-requests', leaveRequestRoutes);
app.use('/api/users', userRoutes);
app.use('/api/loan-requests', loanRequestRoutes);
app.use('/api/overtime-requests', overtimeRequestRoutes);
app.use('/api/duty-posts', dutyPostRoutes);

module.exports = app;
