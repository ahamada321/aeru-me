import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MailingService } from "./service/mailing.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-mailing",
  templateUrl: "./mailing.component.html",
  styleUrls: ["./mailing.component.scss"],
})
export class MailingComponent implements OnInit {
  email: string;

  constructor(private mailing: MailingService) {}

  ngOnInit() {}

  subscribe(mailingForm: any) {
    this.mailing
      .subscribe({
        "fields[email]": mailingForm.value.email,
      })
      .subscribe(
        (result) => {
          if (result.success === true) {
            this.showSwalSuccess();
            mailingForm.reset();
          } else {
            this.showSwalError();
            console.error(result);
            mailingForm.reset();
          }
        },
        (errorResponse: HttpErrorResponse) => {
          console.error(errorResponse);
        }
      );
  }

  showSwalSuccess() {
    Swal.fire({
      icon: "success",
      title: "登録完了しました",
      text: "受信メールからメルマガ配信「同意」を押すことで役立つ情報を受信できるようになります。",
      customClass: {
        confirmButton: "btn btn-primary btn-lg",
      },
      buttonsStyling: false,
    });
  }

  showSwalError() {
    Swal.fire({
      icon: "error",
      title: "登録に失敗しました",
      text: "メールアドレスが半角文字で正しく入力できているかをご確認ください。",
      customClass: {
        confirmButton: "btn btn-primary btn-lg",
      },
      buttonsStyling: false,
    });
  }
}
