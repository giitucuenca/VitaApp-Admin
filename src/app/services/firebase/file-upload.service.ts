import { FileUpload } from './../../controller/models/FileUpload';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private basePath = '/pictograms/images';
  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  // * Agregar archivos para ser subidos a firebase
  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    // * Se crea la ruta donde se guardara el archivo con su nombre incluido
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    // * Se obtine la referecia al path donde se guardara el archivo
    const storageRef = this.storage.ref(filePath);
    // * Se manda a guradar el archivo para esto se envia el path y el archivo.
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    // * El proceso de subida es async por lo que debemos espera a que se finalize la subida
    // * por medio finalize() de rxjs
    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            // * Una vez la subida finaliza se guarda el URL que nos devuelve firebase para guardar las imagenes.
            fileUpload.url = downloadURL;
            // * Se guarda el nombre ademas en el modelo que guarda la informacion del archivo.
            fileUpload.name = fileUpload.file.name;
            // * Se agrega el archivo en caso de que se envien varios a guardar cada fileUpload se va guardando en una lista.
            this.saveFileData(fileUpload);
          });
        })
      )
      .subscribe();

    // * Sirve para guardar el progreso 1 - 100 de subida de un archivo.
    return uploadTask.percentageChanges();
  }
  // * Esta funcion guarda los archivos subidos en una lista en caso de que se guarden varios a la vez.
  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  // * Con esta funcion se obtinente los archivos subidos.
  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, (ref) => ref.limitToLast(numberItems));
  }
  // * Sirve para eliminar un archivo subido a firebase
  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch((error) => console.log(error));
  }

  // * Sirve para eliminar un archivo subido a DataBase de firebase
  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  // * Sirve para eliminar un archivo subido a Storage de firebase
  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
