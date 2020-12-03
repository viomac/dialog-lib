import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[libAppInsertion]'
})
export class InsertionDirective {
  // We call this directive "insertion" as
  // it will mark the point where the dynamic component
  // will be inserted.
  // All we have to do with that directive
  // is to add a ViewContainerRef property.
  constructor(public viewContainerRef: ViewContainerRef) { }
}
