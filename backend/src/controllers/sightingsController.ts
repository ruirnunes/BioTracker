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

// STATS (apenas do utilizador logado — versão correta)
export const getStats = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const { data, error } = await supabase
    .from('sightings')
    .select('species_id')
    .eq('user_id', user.id);

  if (error) return res.status(500).json({ error: error.message });

  const sightings = data || [];

  const totalSightings = sightings.length;
  const distinctSpecies = new Set(
    sightings.map(s => s.species_id)
  ).size;

  res.json({
    totalSightings,
    distinctSpecies
  });
};