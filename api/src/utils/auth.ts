import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { config } from '../config';

export interface UserPayload {
  id: string;
  email: string;
  name: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (payload: UserPayload): string => {
  return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn } as jwt.SignOptions);
};

export const verifyToken = (token: string): UserPayload | null => {
  try {
    return jwt.verify(token, config.jwt.secret) as UserPayload;
  } catch {
    return null;
  }
};

export const extractToken = (authHeader: string | undefined): string | null => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
};
