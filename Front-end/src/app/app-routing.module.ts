import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterfaceClientComponent } from './clientComponents/interface-client/interface-client.component';

const routes: Routes = [
  {path: "clients", component: InterfaceClientComponent},
  {path: "**", redirectTo: 'clients', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
