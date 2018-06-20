import {OverlayContainer} from '@angular/cdk/overlay';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatNativeDateModule, MatDatepickerModule, MatDialogModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {FormsModule } from '@angular/forms';
import { StorageServiceModule} from 'angular-webstorage-service';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AppComponent } from './app.component';
import { ContentWrapperComponent, AddNewItemDialog, ShowDayDialog } from './content-wrapper/content-wrapper.component';

import { registerLocaleData } from '@angular/common';
import LocalePL from '@angular/common/locales/pl';
import 'hammerjs';

registerLocaleData(LocalePL);

@NgModule({
  declarations: [
    AppComponent,
    ContentWrapperComponent,
    AddNewItemDialog,
    ShowDayDialog
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
    AmazingTimePickerModule,
    Ng2SmartTableModule
  ],
  entryComponents: [
      AddNewItemDialog,
      ShowDayDialog
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'pl' } ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('app-dark-theme');
  }
}
