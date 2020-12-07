import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SubscriptionForm } from "../service/subscription.model";
import { SubscriptionService } from "../service/subscription.service";
import { HttpErrorResponse } from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: "app-subscription-lesson-reporter",
  templateUrl: "./subscription-lesson-reporter.component.html",
  styleUrls: ["./subscription-lesson-reporter.component.scss"],
})
export class SubscriptionLessonReporterComponent implements OnInit, OnDestroy {
  focus1: boolean;
  focus2: boolean;
  trialForm: FormGroup;
  formData: SubscriptionForm;
  errorResponse: HttpErrorResponse;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private contactformService: SubscriptionService
  ) {}

  ngOnInit() {
    var navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.add("navbar-transparent");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("contact-page");

    this.initForm();
  }
  ngOnDestroy() {
    var navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.remove("navbar-transparent");
    if (navbar.classList.contains("nav-up")) {
      navbar.classList.remove("nav-up");
    }
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("contact-page");
  }

  initForm() {
    this.trialForm = this.formBuilder.group({
      username: [""],
      email: [""],
      company: [""],
      position: [""],
      msg: [""],
      terms: [false],
    });
  }

  isInvalidForm(fieldname): boolean {
    return (
      this.trialForm.controls[fieldname].invalid &&
      this.trialForm.controls[fieldname].touched
    );
    //  (this.contactForm.controls[fieldname].dirty ||
    //  this.contactForm.controls[fieldname].touched)
  }

  sendMessage(trialForm) {
    this.contactformService.sendFormMsg(trialForm.value).subscribe(
      (Message) => {
        trialForm.reset();
        this.showSwalSuccess();
      },
      (errorResponse: HttpErrorResponse) => {
        this.errorResponse = errorResponse;
      }
    );
  }

  modalOpen(content) {
    this.modalService.open(content, { backdrop: "static" });
  }

  private showSwalSuccess() {
    Swal.fire({
      type: "success",
      title: "送信されました",
      text: "数日以内にトライアルIDを発行致します",
      confirmButtonClass: "btn btn-primary btn-lg",
      buttonsStyling: false,
      timer: 5000,
    }).then(() => {
      this.router.navigate(["/"]);
    });
  }
}