// backend/src/controllers/sightingsController.ts
import express from 'express';
import type { Request, Response } from 'express'; // only import types
import supabase from '../supabaseClient.js';

// Interface for a sighting
interface Sighting {
  id?: string;
  user_id?: string;
  common_name: string;
  genus: string;
  species: string;
  type: 'animal' | 'plant' | 'fungus';
  location: string;
  date: string;
  image_url?: string;
  created_at?: string;
}

// Get all sightings
export const getSightings = async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('sightings')
    .select('*') as { data: Sighting[] | null; error: any };

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// Get a single sighting by id
export const getSightingById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('sightings')
    .select('*')
    .eq('id', id)
    .single() as { data: Sighting | null; error: any };

  if (error || !data) return res.status(404).json({ error: 'Sighting not found' });
  res.json(data);
};

// Create a new sighting
export const createSighting = async (req: Request, res: Response) => {
  const { user_id, common_name, genus, species, type, location, date, image_url } = req.body as Sighting;

  if (!common_name || !genus || !species || !type || !location || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { data, error } = await supabase
    .from('sightings')
    .insert([{
      user_id,
      common_name,
      genus,
      species,
      type,
      location,
      date,
      image_url
    }])
    .select() as { data: Sighting[] | null; error: any };

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data![0]);
};

// Update an existing sighting
export const updateSighting = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { common_name, genus, species, type, location, date, image_url } = req.body as Sighting;

  const { data, error } = await supabase
    .from('sightings')
    .update({ common_name, genus, species, type, location, date, image_url })
    .eq('id', id)
    .select() as { data: Sighting[] | null; error: any };

  if (error) return res.status(500).json({ error: error.message });
  res.json(data![0]);
};

// Delete a sighting
export const deleteSighting = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('sightings')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Sighting deleted successfully' });
};

// Get statistics: total sightings, distinct species, most active user
export const getStats = async (req: Request, res: Response) => {
  try {
    // Fetch all sightings WITHOUT type arguments
    const { data, error } = await supabase
      .from('sightings')
      .select('*');

    if (error) throw error;

    const sightings = data || [];

    if (sightings.length === 0) {
      return res.json({
        totalSightings: 0,
        distinctSpecies: 0,
        mostActiveUser: null,
      });
    }

    // Cast to any[] to usar no cálculo
    const sightingsTyped = sightings as any[];

    const totalSightings = sightingsTyped.length;

    const distinctSpecies = new Set(sightingsTyped.map(s => s.species)).size;

    // Most active user
    const userCounts: Record<string, number> = {};
    sightingsTyped.forEach(s => {
      if (s.user_id) userCounts[s.user_id] = (userCounts[s.user_id] || 0) + 1;
    });

    const mostActiveUser = Object.entries(userCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

    res.json({ totalSightings, distinctSpecies, mostActiveUser });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Something went wrong' });
  }
};