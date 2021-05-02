import { Component, Input, OnInit } from '@angular/core';
import { FileUploadResponse } from 'src/app/controller/interfaces/image.interface';

@Component({
  selector: 'app-images-radio',
  templateUrl: './images-radio.component.html',
  styleUrls: ['./images-radio.component.scss'],
})
export class ImagesRadioComponent implements OnInit {
  images: FileUploadResponse[] = [];

  principalImage = '';

  @Input() usedBy = 'none';

  constructor() {}

  ngOnInit(): void {}

  addImage(src: FileUploadResponse): void {
    this.images.push(src);
    if (this.images.length === 1) {
      this.principalImage = src.imageUrl;
    }
    console.log(this.images);
  }

  deleteImage(event: any, index: number, src: string): void {
    event.stopPropagation();
    this.images.splice(index, 1);
    if (src === this.principalImage) {
      this.principalImage = this.images.length ? this.images[0].imageUrl : '';
    }
  }

  emptyImages(): void {
    this.images = [];
  }

  get imagePrimary(): string {
    return this.principalImage;
  }

  get getImages(): FileUploadResponse[] {
    return this.images;
  }
}
