import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NouisliderModule } from "ng2-nouislider";
import { TagInputModule } from "ngx-chips";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";

import { AuthModule } from "./auth/auth.module";
import { ContactFormModule } from "./common/contactform/contactform.module";
import { RentalModule } from "./rental/rental.module";
import { UserModule } from "./user/user.module";

import { TopComponent } from "./static/top/top.component";
import { LineupComponent } from "./static/lineup/lineup.component";
import { LandingSaasComponent } from "./static/landing-saas/landing-saas.component";
import { LandingAptrainerComponent } from "./static/landing-aptrainer/landing-aptrainer.component";
import { AboutusComponent } from "./static/aboutus/aboutus.component";
import { ContactusComponent } from "./static/contactus/contactus.component";
import { Page404Component } from "./static/page404/page404.component";
import { Page422Component } from "./static/page422/page422.component";
import { Page500Component } from "./static/page500/page500.component";
import { TermsComponent } from "./static/terms/terms.component";
import { PrivacyComponent } from "./static/privacy/privacy.component";
import { MaintenanceComponent } from './static/maintenance/maintenance.component';
import { ELearningComponent } from './static/e-learning/e-learning.component';

const routes: Routes = [
  { path: "", component: TopComponent },
  { path: "lineup", component: LineupComponent },
  { path: "online-booking", component: LandingSaasComponent },

  { path: "aboutus", component: AboutusComponent },
  { path: "contactus", component: ContactusComponent },
  { path: "terms", component: TermsComponent },
  { path: "privacy", component: PrivacyComponent },
  // { path: 'faq',          component: FAQComponent },

  { path: "ap-trainer", component: LandingAptrainerComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: 'e-learning', component: ELearningComponent },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', component: Page404Component }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    AngularMultiSelectModule,
    NgbModule, // Using in LandingComponent
    NouisliderModule,
    TagInputModule,
    JwBootstrapSwitchNg2Module,
    AuthModule,
    ContactFormModule,
    RentalModule,
    UserModule,
  ],
  exports: [RouterModule],
  declarations: [
    TopComponent,
    LineupComponent,
    LandingSaasComponent,
    LandingAptrainerComponent,
    AboutusComponent,
    ContactusComponent,
    MaintenanceComponent,
    Page404Component,
    Page422Component,
    Page500Component,
    TermsComponent,
    PrivacyComponent,
  ],
})
export class AppRoutingModule { }
