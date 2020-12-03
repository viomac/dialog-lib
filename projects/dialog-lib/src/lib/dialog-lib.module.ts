import { NgModule } from '@angular/core';
import { DialogLibComponent } from './dialog-lib.component';
import {InsertionDirective} from './insertion.directive';



@NgModule({
  declarations: [
    DialogLibComponent,
    InsertionDirective
  ],
  imports: [
  ],
  exports: [DialogLibComponent]
})
export class DialogLibModule { }
