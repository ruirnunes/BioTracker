import type { Request, Response } from 'express';
import { supabaseWithAuth } from '../utils/supabaseWithAuth.js';

interface Sighting {
  id?: string;
  user_id?: string;
  species_id?: string;
  location?: string;
  date?: string;
  image_url?: string;
}

// Helper to extract token
const getTokenFromRequest = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  return authHeader.replace('Bearer ', '');
};

// GET all sightings (only logged user)
export const getSightings = async (req: Request, res: Response) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const supabase = supabaseWithAuth(token);

  const { data, error } = await supabase
    .from('sightings')
    .select(`
      id,
      location,
      date,
      image_url,
      users:user_id (
        id,
        name
      ),
      species:species_id (
        id,
        common_name,
        genus,
        species,
        type
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

// GET one sighting (only owner)
export const getSightingById = async (req: Request, res: Response) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const supabase = supabaseWithAuth(token);
  const { id } = req.params;

  const { data, error } = await supabase
    .from('sightings')
    .select(`
      id,
      user_id,
      location,
      date,
      image_url,
      species:species_id (
        id,
        common_name,
        genus,
        species,
        type
      ),
      users:user_id (
        id,
        name
      )
    `)
    .eq('id', id)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: 'Sighting not found' });
  }

  res.json(data);
};

// CREATE
export const createSighting = async (req: Request, res: Response) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const supabase = supabaseWithAuth(token);
  const user = (req as any).user;

  const { species_id, location, date, image_url } = req.body as Sighting;

  if (!species_id || !location || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { data, error } = await supabase
    .from('sightings')
    .insert([
      {
        user_id: user.id,
        species_id,
        location,
        date,
        image_url
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
};

// UPDATE (owner only)
export const updateSighting = async (req: Request, res: Response) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const supabase = supabaseWithAuth(token);
  const user = (req as any).user;
  const { id } = req.params;

  const { species_id, location, date, image_url } = req.body as Sighting;

  const updatePayload: Partial<Sighting> = {};

  if (species_id !== undefined) updatePayload.species_id = species_id;
  if (location !== undefined) updatePayload.location = location;
  if (date !== undefined) updatePayload.date = date;
  if (image_url !== undefined) updatePayload.image_url = image_url;

  const { data, error } = await supabase
    .from('sightings')
    .update(updatePayload)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Not found or not allowed' });
  }

  res.json(data);
};

// DELETE (owner only)
export const deleteSighting = async (req: Request, res: Response) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const supabase = supabaseWithAuth(token);
  const user = (req as any).user;
  const { id } = req.params;

  const { data, error } = await supabase
    .from('sightings')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)
    .select();

  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: 'Not found or not allowed' });
  }

  res.json({ message: 'Deleted successfully' });
};

// STATS (GLOBAL)
export const getStats = async (req: Request, res: Response) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const supabase = supabaseWithAuth(token);

  const { data, error } = await supabase
    .from('sightings')
    .select(`
      id,
      user_id,
      species_id,
      location,
      date,
      created_at,
      species:species_id (
        id,
        type,
        common_name
      ),
      users:user_id (
        id,
        name
      )
    `);

  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ error: error.message });
  }

  const sightings = data ?? [];

  const totalSightings = sightings.length;

  const distinctSpecies = new Set(
    sightings.map((s: any) => s.species_id)
  ).size;

  const sightingsPerType: Record<string, number> = {};

  for (const s of sightings as any[]) {
    const type = s.species?.type ?? 'unknown';
    sightingsPerType[type] = (sightingsPerType[type] || 0) + 1;
  }

  const userCount: Record<string, number> = {};

  for (const s of sightings as any[]) {
    userCount[s.user_id] = (userCount[s.user_id] || 0) + 1;
  }

  let mostActiveUserId: string | null = null;
  let maxCount = 0;

  for (const userId in userCount) {
    if (userCount[userId] > maxCount) {
      maxCount = userCount[userId];
      mostActiveUserId = userId;
    }
  }

  let mostActiveUser = null;

  if (mostActiveUserId) {
    const found = (sightings as any[]).find(
      s => s.user_id === mostActiveUserId
    )?.users;

    if (found) {
      mostActiveUser = {
        id: found.id,
        name: found.name,
        sightingsCount: maxCount
      };
    }
  }

  const latestSightings = [...(sightings as any[])]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  res.json({
    totalSightings,
    distinctSpecies,
    sightingsPerType,
    mostActiveUser,
    latestSightings
  });
};