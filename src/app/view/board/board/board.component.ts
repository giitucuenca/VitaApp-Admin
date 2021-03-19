import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  items: MenuItem[];
  position: MenuItem[];
  subMenu = ['Categorias', 'Subcategoria', 'Pictogramas']
  @ViewChildren('pages') pages: QueryList<ElementRef<HTMLElement>>;

  constructor(
  ) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Categorias', icon: 'pi pi-fw pi-list' },
      { label: 'Agregar Categoria', icon: 'pi pi-fw pi-plus' },
      { label: 'Editar Tablero', icon: 'pi pi-fw pi-pencil' }
    ];

    this.position = [
      { label: this.subMenu[0] }
    ]

  }


  openPage(index: number, addLabel: boolean): void {
    this.pages.forEach((page, i) => {
      if (index === i) {
        if (addLabel) {
          this.position.push({
            label: this.subMenu[i]
          });
        }

        if (page.nativeElement.classList.contains('animate__bounceOut')) {
          page.nativeElement.classList.remove('animate__bounceOut');
          page.nativeElement.classList.add('animate__bounceIn');
        }
      } else {
        if (page.nativeElement.classList.contains('animate__bounceIn')) {
          page.nativeElement.classList.remove('animate__bounceIn');
          page.nativeElement.classList.add('animate__bounceOut');
        }
      }
    })
  }

  goToPage(index: number) {
    for (let i = index + 1; i < this.position.length; i++) {
      this.position.splice(index + 1, 1);
    }
    this.openPage(index, false);
  }

}
