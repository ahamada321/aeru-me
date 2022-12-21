import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from "@danielmoncada/angular-datetime-picker";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BookingDemoModule } from "../common/booking-demo/booking-demo.module";
import { TopComponent } from "./top/top.component";
import { LandingAptrainerComponent } from "./landing-aptrainer/landing-aptrainer.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { MaintenanceComponent } from "./maintenance/maintenance.component";
import { Page404Component } from "./page404/page404.component";
import { Page422Component } from "./page422/page422.component";
import { Page500Component } from "./page500/page500.component";
import { TermsComponent } from "./terms/terms.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { ELearningComponent } from "./e-learning/e-learning.component";
import { TermsTextModule } from "./terms/helpers/terms-text/terms-text.module";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { LandingBiritacoComponent } from "./landing-biritaco/landing-biritaco.component";
import { MailingModule } from "../common/mailing/mailing.module";

const routes: Routes = [
  { path: "", component: LandingBiritacoComponent },
  // { path: "", component: TopComponent },
  { path: "aboutus", component: AboutusComponent },
  { path: "terms", component: TermsComponent },
  { path: "privacy", component: PrivacyComponent },

  { path: "ap-trainer", component: LandingAptrainerComponent },
  { path: "maintenance", component: MaintenanceComponent },
  { path: "e-learning", component: ELearningComponent },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', component: Page404Component }
];

@NgModule({
  declarations: [
    TopComponent,
    LandingBiritacoComponent,
    LandingAptrainerComponent,
    AboutusComponent,
    MaintenanceComponent,
    Page404Component,
    Page422Component,
    Page500Component,
    TermsComponent,
    PrivacyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    JwBootstrapSwitchNg2Module,
    TermsTextModule,
    BookingDemoModule,
    MailingModule,
  ],
  exports: [],
  providers: [],
})
export class StaticModule {}
