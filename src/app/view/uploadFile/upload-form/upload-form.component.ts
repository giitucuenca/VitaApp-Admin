import { FileUploadService } from './../../../services/firebase/file-upload.service';
import { FileUpload } from './../../../controller/models/FileUpload';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
})
export class UploadFormComponent implements OnInit {
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

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
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          (percentage) => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  get getUrlFile(): string {
    return this.currentFileUpload && this.currentFileUpload.url ? this.currentFileUpload.url : undefined;
  }
}
