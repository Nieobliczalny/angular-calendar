import {OverlayContainer} from '@angular/cdk/overlay';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatNativeDateModule, MatDatepickerModule, MatDialogModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {FormsModule } from '@angular/forms';
import { StorageServiceModule} from 'angular-webstorage-service';
import { AmazingTimePickerModule } from 'amazing-time-picker';

import { AppComponent } from './app.component';
import { ContentWrapperComponent, AddNewItemDialog } from './content-wrapper/content-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentWrapperComponent,
    AddNewItemDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    StorageServiceModule,
    AmazingTimePickerModule
  ],
  entryComponents: [
      AddNewItemDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('app-dark-theme');
  }
}
