export interface UserStats {
  totalSightings: number;
  distinctSpecies: number;
  sightingsPerType: Record<string, number>;

  mostActiveUser: {
    id: string;
    name: string;
    sightingsCount: number;
  } | null;

  latestSightings: Array<{
    id: string;
    species_id: string;
    created_at: string;
  }>;
}