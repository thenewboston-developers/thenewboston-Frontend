export interface CreateOpenAIImageRequest {
  description: string;
  quantity: number;
}

export interface CreateOpenAIImageResponse {
  created: number;
  data: ImageData[];
}

interface ImageData {
  url: string;
}
