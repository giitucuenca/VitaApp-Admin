import { Color } from './color.interface';
export interface CategoryGet {
  categoryId:  number;
  name:        string;
  description: string;
  colorId:     number;
  colorM:      Color;
  imageURL:    string;
}
