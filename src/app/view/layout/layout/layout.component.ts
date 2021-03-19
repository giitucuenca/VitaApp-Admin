import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  // * Actualiza la fecha del footer
  date: number;
  constructor() { }

  ngOnInit(): void {
    // * Obtengo la fecha actual
    this.date = Date.now();
  }

}
