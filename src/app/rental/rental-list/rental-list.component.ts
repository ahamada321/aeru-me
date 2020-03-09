import { Component, OnInit, OnDestroy } from '@angular/core';
import { Rental } from '../service/rental.model';
import { RentalService } from '../service/rental.service';
import { MyOriginAuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit, OnDestroy {

  rentals: Rental[] = []

  constructor(
    private rentalService: RentalService,
    public auth: MyOriginAuthService
  ) { }

  ngOnInit() {
    let navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');

    const rentalObservable = this.rentalService.getRentals()
    rentalObservable.subscribe(
      (rentals: Rental[]) => {
        this.rentals = rentals
      },
      (err) => { }
    )
  }

  ngOnDestroy() {
    let navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
  }
  }
}
