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
import { SubscriptionLessonReporterComponent } from "./subscription-lesson-reporter/subscription-lesson-reporter.component";
import { SubscriptionService } from "./service/subscription.service";
import { SubscriptionItClassComponent } from "./subscription-it-class/subscription-it-class.component";

const routes: Routes = [
  {
    path: "subscription",
    component: SubscriptionComponent,
    children: [
      {
        path: "",
        component: SubscriptionLessonReporterComponent,
      },
      {
        path: "it-consulting",
        component: SubscriptionItClassComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    SubscriptionComponent,
    SubscriptionItClassComponent,
    SubscriptionLessonReporterComponent,
  ],
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
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
