import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

import { AuthModule } from './auth/auth.module';
import { ContactFormModule } from './shared/contactform/contactform.module';
import { RentalModule } from './rental/rental.module';
import { UserModule } from './user/user.module';

import { LandingComponent } from './static/landing/landing.component';
import { LandingSaasComponent } from './static/landing-saas/landing-saas.component';
import { AboutusComponent } from './static/aboutus/aboutus.component';
import { ContactusComponent } from './static/contactus/contactus.component';
import { Page404Component } from './static/page404/page404.component';
import { Page422Component } from './static/page422/page422.component';
import { Page500Component } from './static/page500/page500.component';
import { TermsComponent } from './static/terms/terms.component';
import { PrivacyComponent } from './static/privacy/privacy.component';


const routes: Routes = [
  { path: 'aboutus',  component: AboutusComponent },
  { path: 'contactus',   component: ContactusComponent },

  // // { path: 'presentation', component: PresentationComponent },
  { path: 'terms',        component: TermsComponent },
  { path: 'privacy',      component: PrivacyComponent },
  // { path: 'faq',          component: FAQComponent },
  // { path: 'trialform',  component: TrialFormComponent },
  // // { path: 'partnership',  component: PartnershipComponent },
  // { path: 'partnership',  component: PresentationComponent },
  // { path: 'userguide',  component: UserguideComponent },
  // { path: 'usersvoice',  component: UsersVoiceComponent },
  // { path: 'results',  component: ResultsComponent },

  { path: '',         component: LandingSaasComponent},
  { path: 'lp',         component: LandingComponent},
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', component: Page404Component }
]

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
    UserModule
  ],
  exports: [RouterModule],
  declarations: [
    LandingComponent,
    LandingSaasComponent,
    AboutusComponent,
    ContactusComponent,
    Page404Component,
    Page422Component,
    Page500Component,
    TermsComponent,
    PrivacyComponent
]
})
export class AppRoutingModule { }
