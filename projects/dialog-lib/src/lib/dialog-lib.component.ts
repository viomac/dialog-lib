import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  Type,
  ViewChild
} from '@angular/core';
import {Subject} from 'rxjs';
import {InsertionDirective} from './insertion.directive';

@Component({
  selector: 'lib-dialog-lib',
  template: `
    <div class="overlay" (click)="onOverlayClicked($event)">
      <div class="dialog" (click)="onDialogClicked($event)">
        <ng-template libAppInsertion></ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./dialog-lib.component.css']
})
export class DialogLibComponent implements AfterViewInit, OnDestroy {
  private readonly onClose = new Subject<any>();

  public componentRef: ComponentRef<any>;
  public childComponentType: Type<any>;
  public onClose$ = this.onClose.asObservable();

  @ViewChild(InsertionDirective) insertionPoint: InsertionDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    // Because we are using a reference to the view
    // in loadChildComponent, we need to make sure that
    // the view is fully loaded before we use it.
    // That is why we are calling the method in ngAfterViewInit.
    this.loadChildComponent(this.childComponentType);
    // We then trigger change detection, once our dynamic
    // child-component is loaded.
    this.cd.detectChanges();
  }

  onOverlayClicked(evt: MouseEvent): void {}

  onDialogClicked(evt: MouseEvent): void {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>): void {
    // This method takes the type of the child-component as a parameter.
    // We then use this type to resolve the factory for this component.
    // With the help of the factory and the insertion point,
    // we then instantiate the dynamic child-component.
    // We do so by getting the ViewContainerRef of the directive
    // (we added that property to the directive before)
    // and using it to create the component.
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(componentType);

    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
