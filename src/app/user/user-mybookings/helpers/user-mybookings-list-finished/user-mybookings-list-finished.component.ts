import { Component, OnInit, Input } from '@angular/core';
import { Booking } from 'src/app/rental/rental-detail/rental-detail-booking/services/booking.model';
import { Review } from 'src/app/common/review/service/review.model';
import { BookingService } from 'src/app/rental/rental-detail/rental-detail-booking/services/booking.service';
import { PaymentService } from 'src/app/common/payment/services/payment.service';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment-timezone';


@Component({
  selector: 'app-user-mybookings-list-finished',
  templateUrl: './user-mybookings-list-finished.component.html',
  styleUrls: ['./user-mybookings-list-finished.component.scss']
})
export class UserMyBookingsListFinishedComponent implements OnInit {
  @Input() bookings: Booking[]
  bookingDeleteIndex: number = undefined

  constructor(private bookingService: BookingService,
              private paymentService: PaymentService,
              public dialogService: MatDialog ) { }

  ngOnInit() {
  }

  reviewHandler(index: number, review: Review) {
    this.bookings[index]['review'] = review // Update Frontend
  }

  isExpired(startAt) {
    const timeNow = moment() // Attention: just "moment()" is already applied timezone!
    return moment(startAt).diff(timeNow) < 0
  }
}
