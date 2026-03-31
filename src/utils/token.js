import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export const ACCESS_TTL = 7 * 24 * 60 * 60;
export const REFRESH_TTL = 1 * 24 * 60 * 60;

export const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: ACCESS_TTL,
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, config.JWT_SECRET);
};

export const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString('hex');
};
