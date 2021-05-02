import { ImagesRadioComponent } from './../../images/images-radio/images-radio.component';
import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subcategory } from 'src/app/controller/interfaces/subcategory.interface';
import { Color } from 'src/app/controller/interfaces/color.interface';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { UploadFormComponent } from '../../uploadFile/upload-form/upload-form.component';
import { FileUploadResponse } from 'src/app/controller/interfaces/image.interface';
declare var Notify: any;

@Component({
  selector: 'app-form-subcategory',
  templateUrl: './form-subcategory.component.html',
  styleUrls: ['./form-subcategory.component.scss'],
})
export class FormSubcategoryComponent implements OnInit {
  @ViewChild('uploadFileComp') uploadFileComp: UploadFormComponent;
  @ViewChild('imageRadioSubcategory')
  imageRadioSubcategory: ImagesRadioComponent;
  @Output() reloadSubcategories = new EventEmitter<boolean>();
  invalidUrl = false;
  categoryId = -1;

  colors: Color[] = [];
  formSubcategory: FormGroup;
  constructor(
    private vitaapp: VitaappService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.vitaapp.getColor().subscribe(
      (colors) => {
        this.colors = colors;
        console.log(colors);
      },
      (err) => console.log('error al cargar los colores')
    );
  }

  saveSubcategory(): void {
    this.formSubcategory.get('categoryId').setValue(this.categoryId);
    this.setImageURL(this.imageRadioSubcategory.imagePrimary);
    if (this.formSubcategory.valid) {
      const subcategory: Subcategory = {
        name: this.getName,
        description: this.getDescription,
        imageUrl: this.getImageURL,
        categoryId: this.getCategoryId,
        images: this.imageRadioSubcategory.getImages,
      };
      this.initializeForm();
      this.uploadFileComp.inicializeUpload();

      this.vitaapp.saveSubcategory(subcategory).subscribe(
        (resp) => {
          console.log(resp);
          this.reloadSubcategories.emit(true);
          Notify('Categoria agregada correctamente.', null, null, 'success');
        },
        (err) => {
          console.log(err);
          Notify('Error al agregar una categoria.', null, null, 'danger');
        }
      );
    } else {
      this.validateForm();
      this.invalidUrl = this.formSubcategory.get('imageURL').invalid;
    }
  }

  initializeForm(): void {
    this.invalidUrl = false;
    this.formSubcategory = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageURL: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
    if (this.imageRadioSubcategory) {
      this.imageRadioSubcategory.emptyImages();
    }
  }

  get invalidName(): boolean {
    return (
      this.formSubcategory.get('name').invalid &&
      this.formSubcategory.get('name').touched
    );
  }
  get invalidDescription(): boolean {
    return (
      this.formSubcategory.get('description').invalid &&
      this.formSubcategory.get('description').touched
    );
  }

  setImageURL(imageURL: string): void {
    if (imageURL) {
      this.invalidUrl = false;
    } else {
      this.invalidUrl = true;
    }
    this.formSubcategory.get('imageURL').setValue(imageURL);
  }

  addImage(src: FileUploadResponse): void {
    this.imageRadioSubcategory.addImage(src);
  }

  setCategoryId(categoryId: number): void {
    this.categoryId = categoryId;
  }

  get getName(): string {
    return this.formSubcategory.get('name').value;
  }

  get getDescription(): string {
    return this.formSubcategory.get('description').value;
  }

  get getImageURL(): string {
    return this.formSubcategory.get('imageURL').value;
  }

  get getCategoryId(): number {
    return this.formSubcategory.get('categoryId').value;
  }

  validateForm(): void {
    if (this.formSubcategory.invalid) {
      return Object.values(this.formSubcategory.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
  }
}
