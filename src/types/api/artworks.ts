export interface CreateArtworkRequest {
  description: string;
  image_url: string;
  name: string;
}

export type EditArtworkRequest = Partial<CreateArtworkRequest>;
