export type SpeciesType = 'animal' | 'plant' | 'fungus';

export interface Species {
  id: string;
  common_name: string;
  genus: string;
  species: string;
  type: SpeciesType;
}

export type CreateSpeciesDto = {
  common_name: string;
  genus: string;
  species: string;
  type: SpeciesType;
};

export type UpdateSpeciesDto = Partial<CreateSpeciesDto>;