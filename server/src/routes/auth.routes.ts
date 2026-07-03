// @ts-nocheck
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { sendMail } from '../utils/email.js';

export const authRoutes = Router();

const passwordPolicy = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

authRoutes.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, username, email, phone, password, confirmPassword, country, city, address, profileImage } = req.body;
    if (!firstName || !lastName || !username || !email || !phone || !password || !confirmPassword || !country || !city || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });
    if (!passwordPolicy.test(password)) return res.status(400).json({ message: 'Password does not meet policy' });

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) return res.status(409).json({ message: 'Email or username already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      phone,
      password: hashed,
      country,
      city,
      address,
      profileImage,
      role: email === 'arbabhussan63@gmail.com' ? 'admin' : 'user',
    });

    await sendMail({
      to: 'arbabhussan63@gmail.com',
      subject: 'New User Registered',
      html: `<p><strong>Full Name:</strong> ${firstName} ${lastName}</p><p><strong>Email:</strong> ${email}</p><p><strong>Username:</strong> ${username}</p><p><strong>Registration Date:</strong> ${new Date().toISOString()}</p>`,
    });

    res.status(201).json({ message: 'User created successfully', user: { ...user.toObject(), password: undefined } });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error });
  }
});

authRoutes.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax' });
    res.json({ message: 'Login successful', token, user: { ...user.toObject(), password: undefined } });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
});

authRoutes.post('/logout', (_req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

authRoutes.get('/me', async (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret') as { id: string };
    const user = await User.findById(payload.id).select('-password');
    res.json({ user });
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
});
