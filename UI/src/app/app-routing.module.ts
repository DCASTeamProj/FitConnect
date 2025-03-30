import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewUserDialogComponent } from './new-user-dialog/new-user-dialog.component';

const routes: Routes = [
  { path: 'new-user', component: NewUserDialogComponent },
  { path: '', redirectTo: '/new-user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
