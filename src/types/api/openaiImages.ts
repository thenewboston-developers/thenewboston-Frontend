export interface CreateOpenAIImageRequest {
  description: string;
  quantity: number;
}

export interface CreateOpenAIImageResponse {
  created: number;
  data: Image[];
}

interface Image {
  b64_json: null;
  revised_prompt: null;
  url: string;
}
