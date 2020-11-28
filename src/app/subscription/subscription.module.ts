import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { ImageUploadModule } from "../common/image-upload/image-upload.module";
import { ImageUploadMyverModule } from "../common/image-upload-myver/image-upload-myver.module";
import { MaterialModule } from "../common/modules/matmodule/matmodule";
import { SubscriptionComponent } from "./subscription.component";

const routes: Routes = [
  {
    path: "subscription",
    component: SubscriptionComponent,
    // children: [
    //   { path: "", component: UserSettingsComponent, canActivate: [AuthGuard] },
    // ],
  },
];

@NgModule({
  declarations: [SubscriptionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    JwBootstrapSwitchNg2Module,
    ImageUploadModule,
    ImageUploadMyverModule,
    MaterialModule,
  ],
  entryComponents: [
    // UserPendingDialog
  ],
  providers: [],
  bootstrap: [],
})
export class UserModule {}
