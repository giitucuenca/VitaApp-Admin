import { Category } from './../../../controller/interfaces/category.interface';
import { UploadFormComponent } from './../../uploadFile/upload-form/upload-form.component';
import { Color } from './../../../controller/interfaces/color.interface';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { VitaappService } from 'src/app/services/vitaapp/vitaapp.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var Notify: any;

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss'],
})
export class FormCategoryComponent implements OnInit {
  @ViewChild('uploadFileComp') uploadFileComp: UploadFormComponent;
  @Output() reloadCateries = new EventEmitter<boolean>();
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
    if (this.formCategory.valid && !this.invalidUrl) {
      const category: Category = {
        name: this.getName,
        description: this.getDescription,
        colorId: this.getColorId,
        imageURL: this.uploadFileComp.getUrlFile
      };
      this.initializeForm();
      this.uploadFileComp.inicializeUpload();

      this.vitaapp.saveCategory(category).subscribe(
        resp => {
          console.log(resp);
          this.reloadCateries.emit(true);
          Notify('Categoria agregada correctamente.', null, null, 'success');
        }, err => {
          console.log(err)
          Notify('Error al agregar una categoria.', null, null, 'danger');
        }
      )
    } else {
      this.validateForm();
    }
  }

  initializeForm(): void {
    this.formCategory = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      colorId: ['', Validators.required]
    });
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

  get invalidUrl(): boolean {
    return this.uploadFileComp && this.uploadFileComp.getUrlFile === undefined;
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

  validateForm(): void {
    if (this.formCategory.invalid) {
      return Object.values(this.formCategory.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
  }
}
