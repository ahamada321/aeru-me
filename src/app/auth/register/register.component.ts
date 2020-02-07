import { Component, OnInit, OnDestroy } from '@angular/core'
import { MyOriginAuthService } from '../service/auth.service';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'
import { User } from 'src/app/user/service/user.model';
import { LoginPupupTestComponent } from '../login-popup/login-popup.component';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  data : Date = new Date()
  isFBloggedIn: boolean

  focus: any;
  focus1: any;
  focus2: any;
  focus3: any;

  formData: User = new User()
  errors: any[] = []

  constructor( 
    private auth: MyOriginAuthService, 
    private socialAuthService: AuthService,
    private modalService: NgbModal,
    private router: Router
    ) { }

  ngOnInit() {
    let body = document.getElementsByTagName('body')[0];
        body.classList.add('full-screen');
        body.classList.add('register-page');
    let navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');

    this.seeFBLoginState()
  }
  
  ngOnDestroy() {
    let body = document.getElementsByTagName('body')[0];
        body.classList.remove('full-screen');
        body.classList.remove('register-page');
    let navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
    }

  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  } 

  seeFBLoginState() {
    return this.socialAuthService.authState.subscribe((user) => {
      if(user) {
        this.formData.FBuserID = user.id
        this.formData.username = user.name
        this.formData.email = user.email
      }
      this.isFBloggedIn = (user != null)
    })
  }

  register() {
    this.auth.register(this.formData).subscribe(
      (isVerified) => {
        if(!isVerified) {
          this.router.navigate(['/register/sent'])
        } else {
          this.showSwalSuccess()
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors
      }
    )
  }

  showSwalSuccess() {
    Swal.fire({
          title: 'メンバー登録完了',
          text: '無事にログイン出来るようになりました！',
          type: 'success',
          confirmButtonClass: "btn btn-primary btn-lg",
          buttonsStyling: false,
          allowOutsideClick: false
      }).then(() => {
          this.modalOpen()
      })
  }

  modalOpen() {
    this.router.navigate(['/'])
    this.modalService.open(LoginPupupTestComponent)
  }
}
