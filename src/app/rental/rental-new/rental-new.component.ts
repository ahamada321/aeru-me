import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RentalService } from '../service/rental.service';
import { MyOriginAuthService } from 'src/app/auth/service/auth.service';
import { Router } from '@angular/router';
import { Rental } from '../service/rental.model';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-rental-new',
  templateUrl: './rental-new.component.html',
  styleUrls: ['./rental-new.component.scss']
})
export class RentalNewComponent implements OnInit, OnDestroy {
  newRental: Rental
  isTouched: boolean = false
  rentalCategories = Rental.CATEGORIES
  errors: any[] = []

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
    private rentalService: RentalService, 
    private router: Router,
    public auth: MyOriginAuthService
  ) { }

  ngOnInit() {
    this.newRental = new Rental()
    this.newRental.image = "assets/img/image_placeholder.jpg"
    if(this.auth.getUserRole() === 'Trainer') {
      this.newRental.rentalname = this.auth.getUsername()
    }

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

  createUnpublishedRental() {
    this.newRental.isShared = false
    this.rentalService.createRental(this.newRental).subscribe(
      (rental: Rental) => {
          this.showSwalSuccess()
      },
      (errorResponse: HttpErrorResponse) => {
          this.errors = errorResponse.error.errors
      }
    )
  }

  createRental() {
    if(!this.isTouched) {
      this.errors.push({detail: "プロフィール写真の選択と切り抜きを先に押してください"})
    } else {
      this.newRental.isShared = true
      this.rentalService.createRental(this.newRental).subscribe(
        (rental: Rental) => {
          this.showSwalSuccess()
        },
        (errorResponse: HttpErrorResponse) => {
          this.errors = errorResponse.error.errors
        }
      )
    }
  }

  private showSwalSuccess() {
    Swal.fire({
        // title: 'User infomation has been updated!',
        text: '商品を新規登録しました！',
        type: 'success',
        confirmButtonClass: "btn btn-primary btn-lg",
        buttonsStyling: false,
        timer: 5000
    }).then(() => {
      this.router.navigate(['/rentals/manage'])
    })
}

  imageChange(uploadedImage) {
    this.isTouched = true
    this.newRental.image = uploadedImage
  }
}
