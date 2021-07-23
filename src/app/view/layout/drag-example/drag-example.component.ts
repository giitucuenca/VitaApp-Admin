import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-example',
  templateUrl: './drag-example.component.html',
  styleUrls: ['./drag-example.component.scss'],
})
export class DragExampleComponent {
  items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  drop(event: CdkDragDrop<any>) {
    this.items[event.previousContainer.data.index] = event.container.data.item;
    this.items[event.container.data.index] = event.previousContainer.data.item;
  }
}
