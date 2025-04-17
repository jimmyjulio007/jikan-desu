export type AnimeType = {
    data: {
      mal_id?: number;
      title?: string;
      synopsis?: string;
      type?: string;
      episodes?: number;
      score?: number;
      status?: string;
      broadcast?: {
        string?: string;
      };
      trailer?: {
        url?: string;
      };
      images?: {
        jpg?: {
          image_url?: string;
          small_image_url?: string;
          large_image_url?: string;
        };
      };
      themes: {
        mal_id?: number;
        name?: string;
      }[];
    };
  };
  