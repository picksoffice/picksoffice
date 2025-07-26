export interface StrapiResponse<T> {
  data: T[];
  meta: any;
}

export interface Pick {
  id: number;
  attributes: {
    Title: string;
    Summary: string;
    Date?: string;
    Author?: string;
    Image?: {
      data?: {
        attributes?: {
          url?: string;
        };
      };
    };
    Slug?: string;
    League?: string;
    Home?: string;
    Away?: string;
    Pick?: string;
    Writeup?: string | null | any;
    publishedAt?: string;
  };
}
