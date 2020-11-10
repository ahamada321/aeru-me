import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ContactFormService } from './service/contactform.service';
import { ContactFormComponent } from './contact-form.component';
import { ContactFormContactusComponent } from './contact-form-contactus/contact-form-contactus.component';
import { ContactFormTrialComponent } from './contact-form-trial/contact-form-trial.component';

const routes: Routes = [
  {
    path: "form",
    component: ContactFormComponent,
    children: [
      { path: "trial", component: ContactFormTrialComponent },
      { path: "contactus", component: ContactFormContactusComponent },
    ],
  },
];

@NgModule({
  declarations: [
    ContactFormComponent,
    ContactFormContactusComponent,
    ContactFormTrialComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [ContactFormService]
})
export class ContactFormModule { }
