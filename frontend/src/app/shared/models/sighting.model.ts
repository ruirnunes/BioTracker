import { Species } from './species.model';

export interface Sighting {
  id: string;
  species_id: string;
  user_id: string;
  location: string;
  date: string;
  image_url?: string;

  // joined from backend
  species?: Species;

  users?: {
    id: string;
    name: string;
  };
}