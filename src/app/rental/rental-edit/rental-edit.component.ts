import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RentalService } from '../service/rental.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Rental } from '../service/rental.model';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-rental-edit',
  templateUrl: './rental-edit.component.html',
  styleUrls: ['./rental-edit.component.scss']
})
export class RentalEditComponent implements OnInit {
    rental: Rental
    isTouched: boolean = true
    errors: any[] = []

    data : Date = new Date();

    // Select category
    dropdownCategoryList = [
      {"id":1,"itemName":"Sport"},
      {"id":2,"itemName":"Music"},
      {"id":3,"itemName":"Others"}
    ]
    dropdownCategorySettings = { 
      singleSelection: true, 
      text:"カテゴリを選択",
      enableSearchFilter: false,
      classes:""
    }

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private rentalService: RentalService
    ) { }

    ngOnInit() {
      this.route.params.subscribe(
        (params) => {
          this.getRental(params['rentalId'])
        })

      let navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.add('navbar-transparent');
      let body = document.getElementsByTagName('body')[0];
      body.classList.add('add-product');
    }
    ngOnDestroy(){
      let navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.remove('navbar-transparent');
      let body = document.getElementsByTagName('body')[0];
      body.classList.remove('add-product');
    }

    getRental(rentalId: string) {
      this.rentalService.getRentalById(rentalId).subscribe(
        (rental: Rental) => {
          this.rental = rental
        },
        (errorResponse: HttpErrorResponse) => {
          this.errors = errorResponse.error.errors
        }
      )
    }

    unpublishRental() {
      this.rental.shared = false
      this.rentalService.updateRental(this.rental._id, this.rental).subscribe(
        (updatedRental) => {
          this.showSwalSuccess()
        },
        (errorResponse: HttpErrorResponse) => {
          this.errors = errorResponse.error.errors
        }
      )
    }

    updateRental() {
      this.rental.shared = true
      this.rentalService.updateRental(this.rental._id, this.rental).subscribe(
        (updatedRental) => {
          this.showSwalSuccess()
        },
        (errorResponse: HttpErrorResponse) => {
          this.errors = errorResponse.error.errors
        }
      )
    }

    private showSwalSuccess() {
        Swal.fire({
            // title: 'User infomation has been updated!',
            text: '商品情報を更新しました！',
            type: 'success',
            confirmButtonClass: "btn btn-primary btn-lg",
            buttonsStyling: false,
            timer: 5000
        }).then(() => {
          this.router.navigate(['/rentals/manage'])
        })
    }
}
