export type SpeciesType = 'animal' | 'plant' | 'fungus';

export interface Species {
  id: string;
  common_name: string;
  genus: string;
  species: string;
  type: SpeciesType;
}