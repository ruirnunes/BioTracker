import type { Request, Response } from 'express';
import supabase from '../supabaseClient.js';

// GET current user profile
export const getMe = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};

// UPDATE current user profile
export const updateMe = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const { name } = req.body;

  const { data, error } = await supabase
    .from('users')
    .update({
      name
    })
    .eq('id', user.id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};

// GET user stats (sightings count)
export const getUserStats = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const { data, error } = await supabase
    .from('sightings')
    .select('id')
    .eq('user_id', user.id);

  if (error) return res.status(500).json({ error: error.message });

  res.json({
    sightingsCount: data?.length || 0
  });
};