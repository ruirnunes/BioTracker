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

  const { data: sightings, error } = await supabase
    .from('sightings')
    .select(`
      id,
      location,
      date,
      created_at,
      species!inner (
        id,
        common_name,
        genus,
        species,
        type
      )
    `)
    .eq('user_id', user.id)
    .returns<Sighting[]>();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const safe = sightings ?? [];

  // GET USER NAME
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('name')
    .eq('id', user.id)
    .single();

  if (userError) {
    return res.status(500).json({ error: userError.message });
  }

  // TOTAL SIGHTINGS
  const totalSightings = safe.length;

  // DISTINCT SPECIES
  const distinctSpecies = new Set(
    safe.map(s => s.species.id)
  ).size;

  // SPECIES PER TYPE
  const sightingsPerType: Record<string, number> = {};

  for (const s of safe) {
    const type = s.species.type || 'unknown';

    sightingsPerType[type] =
      (sightingsPerType[type] || 0) + 1;
  }

  // MOST ACTIVE USER (SELF)
  const mostActiveUser = {
    id: user.id,
    name: userData?.name ?? 'Unknown',
    sightingsCount: totalSightings
  };

  // LATEST SIGHTINGS
  const latestSightings = [...safe]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  return res.json({
    totalSightings,
    distinctSpecies,
    sightingsPerType,
    mostActiveUser,
    latestSightings
  });
};