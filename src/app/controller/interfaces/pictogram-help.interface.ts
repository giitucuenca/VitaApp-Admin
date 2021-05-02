import { ImagePictogramHelp } from './image.interface';

export interface PictogramHelp {
  pictogramId?: number;
  name: string;
  imageUrl: string;
  images: ImagePictogramHelp[];
}
