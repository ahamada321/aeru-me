import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { sharedModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../auth/service/auth.guard';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

import { UserComponent } from './user.component';
import { UserMyBookingsComponent } from './user-mybookings/user-mybookings.component';
import { UserPendingComponent } from './user-pending/user-pending.component';
import { UserPendingListComponent, UserPendingDialog } from './user-pending/user-pending-list/user-pending-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

// import { FormatDatePipe } from '../shared/pipes/format-date.pipe';
// import { FormatTimePipe } from '../shared/pipes/format-time.pipe';
// import { ImageUploadModule } from '../shared/components/image-upload/image-upload.module';
import { ReviewModule } from '../shared/review/review.module';

import { MaterialModule } from '../shared/modules/matmodule/matmodule';
import { BookingSelecterModule } from '../shared/booking-selecter/booking-selecter.module';
import { UserMyFavouriteComponent } from './user-myfavourite/user-myfavourite.component';
import { UserMyBookingsListComponent } from './user-mybookings/user-mybookings-list/user-mybookings-list.component';
import { MyfavouriteListItemComponent } from './user-myfavourite/myfavourite-list-item/myfavourite-list-item.component';


const routes: Routes = [{
  path: 'user',
  component: UserComponent,
  children: [
    { path: 'myfavourite', component: UserMyFavouriteComponent, canActivate: [AuthGuard] },
    { path: 'mybookings', component: UserMyBookingsComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: UserSettingsComponent, canActivate: [AuthGuard] },
  // { path: ':rentalId/edit', component: RentalDetailUpdateComponent }
    { path: 'pending', component: UserPendingComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'profile', pathMatch: 'full' }
  ]
}]

@NgModule({
  declarations: [
    UserComponent,
    MyfavouriteListItemComponent,
    UserMyFavouriteComponent,
    UserMyBookingsComponent, 
    UserMyBookingsListComponent,
    UserPendingComponent,
    UserPendingListComponent,
    UserPendingDialog,
    UserProfileComponent,  
    UserSettingsComponent,
    // FormatDatePipe,
    // FormatTimePipe,         
  ],
  imports: [
    // sharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    JwBootstrapSwitchNg2Module,
    // ImageUploadModule,
    MaterialModule,
    ReviewModule,
    BookingSelecterModule
  ],
  entryComponents: [
    UserPendingDialog
  ],
  providers: [],
  bootstrap: []
})
export class UserModule { }