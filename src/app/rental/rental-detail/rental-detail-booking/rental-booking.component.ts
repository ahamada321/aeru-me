import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MyOriginAuthService } from 'src/app/auth/service/auth.service';
import { RentalService } from '../../service/rental.service';
import { BookingService } from './services/booking.service';
import { BookingHelperService } from './services/booking.helper.service';
// import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material';
import { Rental } from '../../service/rental.model';
import { Booking } from './services/booking.model';
import { HttpErrorResponse } from '@angular/common/http';

import { MatStepper } from '@angular/material';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-rental-booking',
  templateUrl: './rental-booking.component.html',
  styleUrls: ['./rental-booking.component.scss']
})
export class RentalBookingComponent implements OnInit, OnDestroy {
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    @ViewChild('stepper', {static: false}) stepper: MatStepper;

    isSelectedDateTime: boolean = false
    chosenCourseTime: number = 60

    isChangeBtnClicked: boolean = false
  
    rental: Rental
    newBooking: Booking
    paymentToken: string
    // stripeCustomerId: string = ""
    customer: any
    
    errors: any[] = []


    constructor(
        private route: ActivatedRoute,
        private rentalService: RentalService,
        private router: Router,
        private _formBuilder: FormBuilder,
        private helper: BookingHelperService,
        private bookingService: BookingService,
        private auth: MyOriginAuthService,

    ) { }

    ngOnInit() {
        this.getStripeCustomerInfo()
        this.route.params.subscribe(
            (params) => {
                this.getRental(params['rentalId'])
                if(params['selectedCourse'] === '1') this.chosenCourseTime = 60
                else if(params['selectedCourse'] === '2') this.chosenCourseTime = 90
        })
    }

    ngOnDestroy() {
        var navbar = document.getElementsByTagName('nav')[0];
        if (navbar.classList.contains('nav-up')) {
            navbar.classList.remove('nav-up');
        }
    }

    getStripeCustomerInfo() {
        const userId = this.auth.getUserId()
        this.auth.getUserById(userId).subscribe(
            (user) => {
                this.customer = user.customer
                //this.getUserLast4()
            },
            (err) => { }
        )
    }

    getRental(rentalId: string) {
        this.rentalService.getRentalById(rentalId).subscribe(
            (rental: Rental) => {
                this.rental = rental
            }
        )
    }

    onBookingReady(newBooking: Booking) {
        this.newBooking = newBooking
        this.stepper.next();
    }

    onPaymentConfirmed(paymentToken: string) {
        this.paymentToken = paymentToken
        this.isChangeBtnClicked = false
    }

    createBooking() {
        this.newBooking.paymentToken = this.paymentToken

        this.newBooking.rental = this.rental
        this.bookingService.createBooking(this.newBooking).subscribe(
          (newBooking: any) => {
            this.addNewBookedDateTimes(newBooking) // Update front UI
            this.newBooking = new Booking()
            this.showSwalSuccess()
          },
          (errorResponse: HttpErrorResponse) => {
            this.errors = errorResponse.error.errors
            
          }
        )
    }

    private addNewBookedDateTimes(bookingData: any) { // Update UI of frontend.
        this.rental.bookings.push(bookingData)
    }

    showSwalSuccess() {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-danger btn-lg',
              cancelButton: 'btn btn-lg'
            },
            buttonsStyling: false,
          })

        swalWithBootstrapButtons.fire({
            title: '予約申込完了！',
            text: '商品オーナーからのお返事をお待ちください',
            type: 'success',
            // showConfirmButton: false,
            timer: 5000
        }).then((result) => {
            //this.newBookingCreated.emit(newBooking)
            this.router.navigate(['/user/pending'])
        })
      }
}
