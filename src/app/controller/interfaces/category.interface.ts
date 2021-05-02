import { ImageCategory } from "./image.interface";

export interface Category {
  categoryId?: number;
  name: string;
  description: string;
  colorId: number;
  color?: string;
  imageUrl: string;
  show?: boolean;
  images: ImageCategory[];
}
