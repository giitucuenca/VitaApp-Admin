export class FileUpload {
  key: string;
  name: string;
  url: string;
  file: File;
  progres: number;

  constructor(file: File) {
    this.file = file;
    this.progres = 0;
  }
}
