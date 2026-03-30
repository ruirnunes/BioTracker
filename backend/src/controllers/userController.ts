import type { Request, Response } from 'express';
import supabase from '../supabaseClient.js';

type AuthUser = {
  id: string;
};

type AuthRequest = Request & {
  user?: AuthUser;
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

// GET user stats (FULL VERSION)
export const getUserStats = async (req: AuthRequest, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: 'Unauthenticated' });
  }

  const { data: sightings, error } = await supabase
    .from('sightings')
    .select('id, species_id, created_at')
    .eq('user_id', user.id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const safe = sightings ?? [];

  const totalSightings = safe.length;

  const distinctSpecies = new Set(
    safe.map(s => s.species_id)
  ).size;

  const sightingsPerType: Record<string, number> = {};

  const latestSightings = [...safe]
    .sort((a, b) =>
      new Date(b.created_at).getTime() -
      new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  return res.json({
    totalSightings,
    distinctSpecies,
    sightingsPerType,
    latestSightings
  });
};