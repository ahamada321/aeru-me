import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPupupComponent } from './login-popup.component';


@NgModule({
  declarations: [
    LoginPupupComponent
],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ], 
  exports: [LoginPupupComponent],
  providers: [

  ],
  bootstrap: [],

  schemas: []
})

export class LoginPopupModule {}
