import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MyOriginAuthService } from 'src/app/auth/service/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Rental } from '../service/rental.model';
import { Review } from 'src/app/shared/review/service/review.model';
import { Booking } from './rental-detail-booking/services/booking.model';
import { RentalService } from '../service/rental.service';
import { ReviewService } from 'src/app/shared/review/service/review.service';
import { EventInput } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';


@Component({
    selector: 'app-rental-detail',
    templateUrl: './rental-detail.component.html',
    styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit, OnDestroy {
    currentId: string
    rental: Rental
    rating: number
    reviews: Review[] = []
    safeUrl: SafeResourceUrl
    newBooking: Booking
    calendarPlugins = [timeGridPlugin]; // important!
    calendarEvents: EventInput[] = []
    calendarBusinessHours: EventInput[] = []

    headerOffset: number = 75; // want to replace like DEFINE HEADER_OFFSET

    constructor(private route: ActivatedRoute,
                private rentalService: RentalService,
                private reviewService: ReviewService,
                public router: Router,
                public auth: MyOriginAuthService,
                public sanitizer: DomSanitizer,
                ) {}

    ngOnInit() {
      let navbar = document.getElementsByTagName('nav')[0];
          navbar.classList.add('navbar-transparent');
      let body = document.getElementsByTagName('body')[0];
          body.classList.add('presentation-page');
  
      this.route.params.subscribe(
        (params) => {
          this.getRental(params['rentalId'])
        })
    }

    ngOnDestroy() {
      let navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.remove('navbar-transparent');
      let body = document.getElementsByTagName('body')[0];
      body.classList.remove('presentation-page');
      if (navbar.classList.contains('nav-up')) {
        navbar.classList.remove('nav-up');
      }
    }

    isYourRental() {
      return this.rental.user._id === this.auth.getUserId()
    }

    getRental(rentalId: string) {
      this.rentalService.getRentalById(rentalId).subscribe(
        (rental: Rental) => {
          this.rental = rental;
          // this.getAvgRating(rental._id)
          this.getReviews(rental._id)
          this.getSafeUrl(rental.course1Img)
        }
      )
    }

    getSafeUrl(url: string) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url)
    }

    getAvgRating(rentalId: string) {
      this.reviewService.getAvgRating(rentalId).subscribe(
        (rating: number) => {
          this.rating = rating
        }
      )
    }

    getReviews(rentalId: string) {
      this.reviewService.getRentalReviews(rentalId).subscribe(
        (reviews: Review[]) => {
          this.reviews = reviews
        },
        () => { }
      )
    }
}
