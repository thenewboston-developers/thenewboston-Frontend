export interface CreateOpenAIImageRequest {
  description: string;
}

export interface CreateOpenAIImageResponse {
  created: number;
  data: ImageData[];
}

interface ImageData {
  url: string;
}
