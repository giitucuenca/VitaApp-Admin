import { FileUploadService } from './../../../services/firebase/file-upload.service';
import { FileUpload } from './../../../controller/models/FileUpload';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FileUploadResponse } from 'src/app/controller/interfaces/image.interface';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
})
export class UploadFormComponent implements OnInit {
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  @ViewChild('inputImage') inputImage: ElementRef<HTMLInputElement>;
  @Output() pathImage = new EventEmitter<FileUploadResponse>();

  constructor(private uploadService: FileUploadService) {}

  ngOnInit(): void {}

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.upload();
  }

  inicializeUpload(): void {
    this.selectedFiles = undefined;
    this.currentFileUpload = undefined;
    this.percentage = 0;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService
          .pushFileToStorage(this.currentFileUpload)
          .subscribe((resp) => {
            this.percentage = (resp.bytesTransferred * 100) / resp.totalBytes;
            if ((resp.bytesTransferred * 100) / resp.totalBytes > 99) {
              resp.ref.getDownloadURL().then((path: string) => {
                console.log(path);
                const name = this.currentFileUpload.name;
                this.pathImage.emit({ name, imageUrl: path });
                this.inputImage.nativeElement.value = '';
              });
            }
            // * Una vez la subida finaliza se guarda el URL que nos devuelve firebase para guardar las imagenes.
          });
      }
    }
  }

  get getUrlFile(): string {
    return this.currentFileUpload && this.currentFileUpload.url
      ? this.currentFileUpload.url
      : undefined;
  }
}
