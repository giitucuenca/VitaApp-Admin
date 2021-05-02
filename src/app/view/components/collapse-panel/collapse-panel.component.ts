import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit,
  OnChanges,
  OnDestroy,
} from '@angular/core';

declare var ResizeObserver;

@Component({
  selector: 'app-collapse-panel',
  templateUrl: './collapse-panel.component.html',
  styleUrls: ['./collapse-panel.component.scss'],
})
export class CollapsePanelComponent
  implements OnInit, AfterViewInit, OnDestroy {
  isCollapsed: boolean = true;

  @ViewChild('collapsePanel') collapsePanel: ElementRef<HTMLElement>;
  @ViewChild('panelContent') panelContent: ElementRef<HTMLElement>;

  resizeObserver: any;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.collapsePanel.nativeElement.style.height = '0';
    this.isCollapsed = true;
    this.resizeObserver = new ResizeObserver(() => {
      if (!this.isCollapsed) {
        this.collapsePanel.nativeElement.style.height =
          this.panelContent.nativeElement.clientHeight + 'px';
      }
    });

    this.resizeObserver.observe(this.panelContent.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.unobserve(this.panelContent.nativeElement);
  }

  collapse(): void {
    if (this.collapsePanel.nativeElement.clientHeight) {
      this.collapsePanel.nativeElement.style.height = '0';
      this.isCollapsed = true;
    } else {
      this.collapsePanel.nativeElement.style.height =
        this.panelContent.nativeElement.clientHeight + 'px';
      this.isCollapsed = false;
    }
  }

  openPanel(): void {
    if (!this.collapsePanel.nativeElement.clientHeight) {
      this.collapsePanel.nativeElement.style.height =
        this.panelContent.nativeElement.clientHeight + 'px';
      this.isCollapsed = false;
    }
  }

  closePanel(): void {
    if (this.collapsePanel.nativeElement.clientHeight) {
      this.collapsePanel.nativeElement.style.height = '0';
      this.isCollapsed = true;
    }
  }
}
