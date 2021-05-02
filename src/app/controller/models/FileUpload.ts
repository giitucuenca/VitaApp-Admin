export class FileUpload {
  key: string;
  name: string;
  url: string;
  file: File;
  progres: number;

  constructor(file: File) {
    this.file = file;
    this.name = file.name.substring(0, file.name.indexOf('.'));
    this.progres = 0;
  }
}
