import type { Request, Response } from 'express';
import supabase from '../supabaseClient.js';

type SpeciesType = 'animal' | 'plant' | 'fungus';

interface Species {
  id?: string;
  common_name: string;
  genus: string;
  species: string;
  type: SpeciesType;
}

// GET all species
export const getSpecies = async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('species')
    .select('*')
    .order('common_name', { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json(data);
};

// GET by id
export const getSpeciesById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('species')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: 'Species not found' });
  }

  return res.json(data);
};

// CREATE
export const createSpecies = async (req: Request, res: Response) => {
  const { common_name, genus, species, type } = req.body as {
    common_name: string;
    genus: string;
    species: string;
    type: SpeciesType;
  };

  if (!common_name || !genus || !species || !type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { data, error } = await supabase
    .from('species')
    .insert([
      {
        common_name,
        genus,
        species,
        type,
      },
    ])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data);
};

// UPDATE
export const updateSpecies = async (req: Request, res: Response) => {
  const { id } = req.params;

  const body = req.body as Partial<{
    common_name: string;
    genus: string;
    species: string;
    type: SpeciesType;
  }>;

  const updates: Partial<Species> = {};

  if (body.common_name !== undefined) updates.common_name = body.common_name;
  if (body.genus !== undefined) updates.genus = body.genus;
  if (body.species !== undefined) updates.species = body.species;
  if (body.type !== undefined) updates.type = body.type;

  const { data, error } = await supabase
    .from('species')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Species not found' });
  }

  return res.json(data);
};

// DELETE
export const deleteSpecies = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('species')
    .delete()
    .eq('id', id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json({ message: 'Species deleted successfully' });
};