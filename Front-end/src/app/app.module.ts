import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// material:
import { MaterialModule} from './material/material.module'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToolbarComponent } from "./toolbar/toolbar.component";
import { BodyComponent } from './clientComponents/body/body.component';
import { UpdateClientComponent } from './clientComponents/update-client/update-client.component';
import { InterfaceClientComponent } from './clientComponents/interface-client/interface-client.component';
import { AddClientComponent } from './clientComponents/add-client/add-client.component';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    UpdateClientComponent,
    BodyComponent,
    ToolbarComponent,
    InterfaceClientComponent,
    AddClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
