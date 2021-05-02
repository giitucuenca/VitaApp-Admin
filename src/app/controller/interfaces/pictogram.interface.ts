import { ImagePictogram } from "./image.interface";

export interface Pictogram {
  pictogramId?: number;
  name: string;
  imageUrl: string;
  subcategoryId: number;
  color?: string;
  images: ImagePictogram[];
}
