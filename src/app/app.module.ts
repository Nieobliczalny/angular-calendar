import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatIconModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { ContentWrapperComponent } from './content-wrapper/content-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentWrapperComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
