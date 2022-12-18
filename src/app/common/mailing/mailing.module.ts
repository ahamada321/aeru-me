import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MailingComponent } from "./mailing.component";
import { MailingService } from "./service/mailing.service";

@NgModule({
  declarations: [MailingComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [MailingComponent],
  providers: [MailingService],
})
export class MailingModule {}
