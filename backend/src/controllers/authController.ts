import type { Request, Response } from 'express';
import supabase from '../supabaseClient.js';

// LOGIN
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    return res.status(401).json({ message: error?.message || 'Invalid credentials' });
  }

  res.json({
    access_token: data.session.access_token,
  });
};

// REGISTER
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  // 🔥 importante: criar user na tabela "users"
  if (data.user) {
    await supabase.from('users').insert([
      {
        id: data.user.id,
        email: data.user.email,
        name: null,
      },
    ]);
  }

  res.json({
    access_token: data.session?.access_token ?? null,
  });
};