import { ImagesRadioComponent } from './../../images/images-radio/images-radio.component';
import { Category } from './../../../controller/interfaces/category.interface';
import { UploadFormComponent } from './../../uploadFile/upload-form/upload-form.component';
import { Color } from './../../../controller/interfaces/color.interface';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  FileUploadResponse,
  ImageCategory,
} from 'src/app/controller/interfaces/image.interface';
declare var Notify: any;

@Component({
  selector: 'app-form-edit-category',
  templateUrl: './form-edit-category.component.html',
  styleUrls: ['./form-edit-category.component.scss'],
})
export class FormEditCategoryComponent implements OnInit {
  @ViewChild('uploadFileComp') uploadFileComp: UploadFormComponent;
  @ViewChild('imageRadioCategory') imageRadioCategory: ImagesRadioComponent;
  @Output() reloadCateries = new EventEmitter<boolean>();
  @Output() collapse = new EventEmitter<boolean>();
  category: Category;
  invalidUrl = false;

  colors: Color[] = [];
  formCategory: FormGroup;
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

  saveCategory(): void {
    this.setImageURL(this.imageRadioCategory.imagePrimary);
    if (this.formCategory.valid && this.imageRadioCategory.getImages.length) {
      const category: Category = {
        categoryId: this.category.categoryId,
        name: this.getName,
        description: this.getDescription,
        colorId: this.getColorId,
        imageUrl: this.getImageURL,
        images: this.imageRadioCategory.getImages,
      };

      this.vitaapp.editCategory(category).subscribe(
        (resp) => {
          console.log(resp);
          this.reloadCateries.emit(true);
          this.initializeForm();
          this.uploadFileComp.inicializeUpload();
          Notify('Categoria agregada correctamente.', null, null, 'success');
        },
        (err) => {
          console.log(err);
          Notify('Error al agregar una categoria.', null, null, 'danger');
        }
      );
    } else {
      this.validateForm();
      this.invalidUrl = this.formCategory.get('imageURL').invalid;
    }
  }

  initializeForm(): void {
    this.invalidUrl = false;
    this.formCategory = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      description: ['', [Validators.required, Validators.maxLength(40)]],
      colorId: ['', Validators.required],
      imageURL: ['', Validators.required],
    });
    if (this.imageRadioCategory) {
      this.imageRadioCategory.emptyImages();
    }
  }

  addImage(src: FileUploadResponse): void {
    this.imageRadioCategory.addImage(src);
  }

  categoryToEdit(category: Category): void {
    this.initializeForm();
    this.category = category;
    this.formCategory.get('name').setValue(category.name);
    this.formCategory.get('description').setValue(category.description);
    category.images.forEach((image: ImageCategory) => {
      const name = image.name;
      const imageUrl = image.imageUrl;
      const imageUpload: FileUploadResponse = {
        name,
        imageUrl,
      };
      this.imageRadioCategory.images.push(imageUpload);
    });
    this.imageRadioCategory.principalImage = category.imageUrl;
    this.formCategory.get('colorId').setValue(category.colorId);
  }

  collapsePanel(): void {
    this.initializeForm();
    this.collapse.emit(true);
  }

  get invalidName(): boolean {
    return (
      this.formCategory.get('name').invalid &&
      this.formCategory.get('name').touched
    );
  }
  get invalidDescription(): boolean {
    return (
      this.formCategory.get('description').invalid &&
      this.formCategory.get('description').touched
    );
  }
  get invalidColor(): boolean {
    return (
      this.formCategory.get('colorId').invalid &&
      this.formCategory.get('colorId').touched
    );
  }

  setImageURL(imageURL: string): void {
    if (imageURL) {
      this.invalidUrl = false;
    } else {
      this.invalidUrl = true;
    }

    this.formCategory.get('imageURL').setValue(imageURL);
  }

  get getName(): string {
    return this.formCategory.get('name').value;
  }

  get getDescription(): string {
    return this.formCategory.get('description').value;
  }

  get getColorId(): number {
    return this.formCategory.get('colorId').value;
  }

  get getImageURL(): string {
    return this.formCategory.get('imageURL').value;
  }

  validateForm(): void {
    if (this.formCategory.invalid) {
      return Object.values(this.formCategory.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
  }
}
