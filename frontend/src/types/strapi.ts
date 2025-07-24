export interface StrapiResponse<T> {
  data: T[];
  meta: any;
}

export interface Pick {
  id: number;
  attributes: {
    Title: string;
    Summary: string;
    // Füge deine Fields hinzu, z. B. Date: string; League: string; etc.
  };
}
