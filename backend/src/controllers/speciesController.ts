import type { Request, Response } from 'express';
import supabase from '../supabaseClient.js';

interface Species {
  id?: string;
  common_name: string;
  genus: string;
  species: string;
  type: 'animal' | 'plant' | 'fungus';
}

// GET all species (público ou autenticado)
export const getSpecies = async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('species')
    .select('*')
    .order('common_name', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};

// GET single species
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

  res.json(data);
};

// CREATE species (opcional: só admin/autenticado)
export const createSpecies = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const { common_name, genus, species, type } = req.body as Species;

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
        type
      }
    ])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data);
};

// UPDATE species
export const updateSpecies = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { common_name, genus, species, type } = req.body as Species;

  const { data, error } = await supabase
    .from('species')
    .update({
      common_name,
      genus,
      species,
      type
    })
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.status(404).json({ error: 'Species not found' });

  res.json(data);
};

// DELETE species
export const deleteSpecies = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('species')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });

  res.json({ message: 'Species deleted successfully' });
};