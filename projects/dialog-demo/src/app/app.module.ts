import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogLibModule } from '../../../dialog-lib/src/lib/dialog-lib.module';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DialogLibModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
