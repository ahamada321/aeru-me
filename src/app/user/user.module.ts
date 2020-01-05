import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from '../auth/service/auth.guard';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { ImageUploadModule } from '../shared/image-upload/image-upload.module';
import { ReviewModule } from '../shared/review/review.module';
import { MaterialModule } from '../shared/modules/matmodule/matmodule';
import { BookingSelecterModule } from '../shared/booking-selecter/booking-selecter.module';

import { UserComponent } from './user.component';
import { UserMyBookingsComponent } from './user-mybookings/user-mybookings.component';
import { UserMyBookingsListComponent } from './user-mybookings/user-mybookings-list/user-mybookings-list.component';
import { UserMyFavouriteComponent } from './user-myfavourite/user-myfavourite.component';
import { MyfavouriteListItemComponent } from './user-myfavourite/myfavourite-list-item/myfavourite-list-item.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';


const routes: Routes = [{
  path: 'user',
  component: UserComponent,
  children: [
    { path: 'myfavourite', component: UserMyFavouriteComponent, canActivate: [AuthGuard] },
    { path: 'mybookings', component: UserMyBookingsComponent, canActivate: [AuthGuard] },
    { path: '', component: UserSettingsComponent, canActivate: [AuthGuard] },
  ]
}]

@NgModule({
  declarations: [
    UserComponent,
    MyfavouriteListItemComponent,
    UserMyFavouriteComponent,
    UserMyBookingsComponent, 
    UserMyBookingsListComponent,
    UserSettingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    JwBootstrapSwitchNg2Module,
    ImageUploadModule,
    MaterialModule,
    ReviewModule,
    BookingSelecterModule
  ],
  entryComponents: [
    // UserPendingDialog
  ],
  providers: [],
  bootstrap: []
})
export class UserModule { }