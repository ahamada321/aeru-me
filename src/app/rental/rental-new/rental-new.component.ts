import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { RentalService } from "../service/rental.service";
import { MyOriginAuthService } from "src/app/auth/service/auth.service";
import { Router } from "@angular/router";
import { Rental } from "../service/rental.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-rental-new",
  templateUrl: "./rental-new.component.html",
  styleUrls: ["./rental-new.component.scss"],
})
export class RentalNewComponent implements OnInit, OnDestroy {
  newRental: Rental;
  isClicked: boolean = false;
  isImage: boolean = false;
  focus: boolean;
  focus2: boolean;
  rentalCategories = Rental.CATEGORIES;
  errors: any[] = [];

  // Select category
  dropdownCategoryLists = [
    "経営者",
    "個人事業主",
    "士業",
    "営業",
    "社会人",
    "学生",
    "その他",
  ];

  // Select province
  dropdownPrefectureList = [
    { id: 1, itemName: "北海道" },
    { id: 2, itemName: "青森県" },
    { id: 3, itemName: "岩手県" },
    { id: 4, itemName: "宮城県" },
    { id: 5, itemName: "秋田県" },
    { id: 6, itemName: "山形県" },
    { id: 7, itemName: "福岡県" },
    { id: 8, itemName: "茨城県" },
    { id: 9, itemName: "栃木県" },
    { id: 10, itemName: "群馬県" },
    { id: 11, itemName: "埼玉県" },
    { id: 12, itemName: "千葉県" },
    { id: 13, itemName: "東京都" },
    { id: 14, itemName: "神奈川県" },
    { id: 15, itemName: "新潟県" },
    { id: 16, itemName: "富山県" },
    { id: 17, itemName: "石川県" },
    { id: 18, itemName: "福井県" },
    { id: 19, itemName: "山梨県" },
    { id: 20, itemName: "長野県" },
    { id: 21, itemName: "岐阜県" },
    { id: 22, itemName: "静岡県" },
    { id: 23, itemName: "愛知県" },
    { id: 24, itemName: "三重県" },
    { id: 25, itemName: "滋賀県" },
    { id: 26, itemName: "京都府" },
    { id: 27, itemName: "大阪府" },
    { id: 28, itemName: "兵庫県" },
    { id: 29, itemName: "奈良県" },
    { id: 30, itemName: "和歌山県" },
    { id: 31, itemName: "鳥取県" },
    { id: 32, itemName: "鳥根県" },
    { id: 33, itemName: "岡山県" },
    { id: 34, itemName: "広島県" },
    { id: 35, itemName: "山口県" },
    { id: 36, itemName: "徳島県" },
    { id: 37, itemName: "香川県" },
    { id: 38, itemName: "愛媛県" },
    { id: 39, itemName: "高知県" },
    { id: 40, itemName: "福岡県" },
    { id: 41, itemName: "佐賀県" },
    { id: 42, itemName: "長崎県" },
    { id: 43, itemName: "熊本県" },
    { id: 44, itemName: "大分県" },
    { id: 45, itemName: "宮崎県" },
    { id: 46, itemName: "鹿児島県" },
    { id: 47, itemName: "沖縄県" },
  ];
  dropdownPrefectureSettings = {
    singleSelection: true,
    text: "都道府県を選択",
    enableSearchFilter: true,
    searchPlaceholderText: "キーワード検索",
    filterSelectAllText: "検索結果一覧",
    filterUnSelectAllText: "検索結果一覧",
    noDataLabel: "検索結果無し",
    // primaryKey: "id",
    // labelKey: "itemName",
    classes: "",
  };

  constructor(
    private rentalService: RentalService,
    private router: Router,
    public auth: MyOriginAuthService
  ) {}

  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.image = "assets/img/image_placeholder.jpg";
    if (this.auth.getUserRole() === "Trainer") {
      this.newRental.rentalname = this.auth.getUsername();
    }

    let navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.add("navbar-transparent");
    let body = document.getElementsByTagName("body")[0];
    body.classList.add("add-product");
  }

  ngOnDestroy() {
    let navbar = document.getElementsByTagName("nav")[0];
    navbar.classList.remove("navbar-transparent");
    let body = document.getElementsByTagName("body")[0];
    body.classList.remove("add-product");
  }

  createUnpublishedRental() {
    this.newRental.isShared = false;
    this.rentalService.createRental(this.newRental).subscribe(
      (rental: Rental) => {
        this.showSwalSuccess();
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.errors = errorResponse.error.errors;
      }
    );
  }

  createRental() {
    if (!this.isImage) {
      this.errors.push({
        detail: "プロフィール写真の選択と切り抜きを先に押してください",
      });
    } else {
      this.newRental.isShared = true;
      this.isClicked = true;
      this.rentalService.createRental(this.newRental).subscribe(
        (rental: Rental) => {
          this.showSwalSuccess();
        },
        (errorResponse: HttpErrorResponse) => {
          console.error(errorResponse);
          this.errors = errorResponse.error.errors;
          this.isClicked = false;
        }
      );
    }
  }

  private showSwalSuccess() {
    Swal.fire({
      // title: 'User infomation has been updated!',
      icon: "success",
      text: "新規登録しました！",
      customClass: {
        confirmButton: "btn btn-primary btn-lg",
      },
      buttonsStyling: false,
      timer: 5000,
    }).then(() => {
      this.router.navigate(["/rentals/manage"]);
    });
  }

  imageChange(uploadedImage) {
    this.isImage = true;
    this.newRental.image = uploadedImage;
  }
}
