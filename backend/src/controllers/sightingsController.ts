import type { Request, Response } from 'express';
import supabase from '../supabaseClient.js';

interface Sighting {
  id?: string;
  user_id?: string;
  species_id?: string;
  location?: string;
  date?: string;
  image_url?: string;
}

// GET all sightings (apenas do utilizador logado)
export const getSightings = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const { data, error } = await supabase
    .from('sightings')
    .select(`
      id,
      species_id,
      location,
      date,
      image_url,
      species:species_id (
        id,
        common_name,
        genus,
        species,
        type
      )
    `)
    .eq('user_id', user.id);

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};

// GET one sighting (apenas do owner)
export const getSightingById = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { id } = req.params;

  const { data, error } = await supabase
    .from('sightings')
    .select(`
      id,
      species_id,
      location,
      date,
      image_url,
      species:species_id (
        id,
        common_name,
        genus,
        species,
        type
      )
    `)
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: 'Sighting not found' });
  }

  res.json(data);
};

// CREATE
export const createSighting = async (req: Request, res: Response) => {
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

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data);
};

// UPDATE (owner only) — versão segura
export const updateSighting = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { id } = req.params;

  const { species_id, location, date, image_url } = req.body as Sighting;

  const updatePayload: any = {};

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

  if (error) return res.status(500).json({ error: error.message });

  if (!data) {
    return res.status(404).json({ error: 'Not found or not allowed' });
  }

  res.json(data);
};

// DELETE (owner only) — versão segura
export const deleteSighting = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { id } = req.params;

  const { data, error } = await supabase
    .from('sightings')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)
    .select();

  if (error) return res.status(500).json({ error: error.message });

  if (!data || data.length === 0) {
    return res.status(404).json({ error: 'Not found or not allowed' });
  }

  res.json({ message: 'Deleted successfully' });
};

// STATS 
export const getStats = async (req: Request, res: Response) => {
  // 1. Fetch all sightings from the database
  const { data, error } = await supabase
    .from('sightings')
    .select('user_id, species_id');

  if (error) return res.status(500).json({ error: error.message });

  const sightings = data || [];

  // 2. Calculate total number of sightings
  const totalSightings = sightings.length;

  // 3. Calculate number of distinct species
  const distinctSpecies = new Set(
    sightings.map(s => s.species_id)
  ).size;

  // 4. Count sightings per user
  const userCountMap: Record<string, number> = {};

  for (const s of sightings) {
    if (!userCountMap[s.user_id]) {
      userCountMap[s.user_id] = 0;
    }
    userCountMap[s.user_id]++;
  }

  // 5. Determine the most active user
  let mostActiveUserId: string | null = null;
  let maxCount = 0;

  for (const userId in userCountMap) {
    if (userCountMap[userId] > maxCount) {
      maxCount = userCountMap[userId];
      mostActiveUserId = userId;
    }
  }

  // 6. Optionally fetch user details from the users table
  let mostActiveUser = null;

  if (mostActiveUserId) {
    const { data: userData } = await supabase
      .from('users')
      .select('id, name')
      .eq('id', mostActiveUserId)
      .single();

    mostActiveUser = userData;
  }

  // 7. Return the final stats response
  res.json({
    totalSightings,
    distinctSpecies,
    mostActiveUser: mostActiveUser
      ? {
          id: mostActiveUser.id,
          name: mostActiveUser.name,
          sightingsCount: maxCount
        }
      : null
  });
};