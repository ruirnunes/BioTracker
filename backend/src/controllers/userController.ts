import type { Request, Response } from 'express';
import supabase from '../supabaseClient.js';

type AuthUser = {
  id: string;
};

type AuthRequest = Request & {
  user?: AuthUser;
};

type Species = {
  id: string;
  common_name: string;
  genus: string;
  species: string;
  type: 'animal' | 'plant' | 'fungus';
};

type Sighting = {
  id: string;
  location: string;
  date: string;
  created_at: string;
  species: Species;
};

// GET current user profile
export const getMe = async (req: AuthRequest, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthenticated' });
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json(data);
};

// UPDATE current user profile
export const updateMe = async (req: AuthRequest, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthenticated' });
  }

  const { name } = req.body;

  const { data, error } = await supabase
    .from('users')
    .update({ name })
    .eq('id', user.id)
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json(data);
};

// GET user stats
export const getUserStats = async (req: AuthRequest, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthenticated' });
  }

  const { data, error } = await supabase
    .from('sightings')
    .select('id')
    .eq('user_id', user.id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const mySightings = data?.length || 0;

  return res.json({
    mySightings
  });
};