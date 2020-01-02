import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactForm } from './service/contactform.model';
import { ContactFormService } from './service/contactform.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-contactform',
    templateUrl: './contactform.component.html',
    styleUrls: ['./contactform.component.scss']
})
export class ContactFormComponent implements OnInit {
    focus1: boolean
    focus2: boolean
    contactForm: FormGroup
    formData: ContactForm
    errorResponse: HttpErrorResponse

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private contactformService: ContactFormService
        ) { }

    ngOnInit() {
        this.initForm()
    }

    initForm() {
        this.contactForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', 
            [
              Validators.required,
              Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            ]],
            msg: ['', Validators.required]
        })
    }

    isInvlidForm(fieldname): boolean {
        return this.contactForm.controls[fieldname].invalid && 
              this.contactForm.controls[fieldname].touched
              //  (this.contactForm.controls[fieldname].dirty || 
              //  this.contactForm.controls[fieldname].touched)
    }


    sendMessage(contactForm) {
        this.contactformService.sendFormMsg(contactForm.value).subscribe(
            (Message) => {
                contactForm.reset()
                this.showSwalSuccess()
            },
            (errorResponse: HttpErrorResponse) => {
                this.errorResponse = errorResponse
            }
        )
    }

    private showSwalSuccess() {
        Swal.fire({
            type: 'success',
            title: '送信されました',
            text: '数日以内にお返事させていただきます',
            confirmButtonClass: "btn btn-primary btn-lg",
            buttonsStyling: false,
            timer: 5000
        }).then(() => {
            this.router.navigate(['/'])
        })
    }
}
