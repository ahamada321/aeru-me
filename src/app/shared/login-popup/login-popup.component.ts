import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyOriginAuthService } from 'src/app/auth/service/auth.service';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';



@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPupupComponent implements OnInit, OnDestroy {
  @Input() title: string = "ログイン"
  @Output() click = new EventEmitter()

  closeResult: string;
  
  isFBloggedIn: boolean
  pressedFBButton: boolean = false
  user: any

  loginForm: FormGroup
  errors: any[] = []
  notifyMessage: string = ''

  constructor(private formBuilder: FormBuilder,
              private auth: MyOriginAuthService,
              private socialAuthService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private ref:ChangeDetectorRef,
              private location: Location ) { }

  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    // body.classList.add('full-screen');
    body.classList.add('login-popup');

    this.seeFBLoginState()
    this.initForm()
    this.click.emit(true)
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
  //   body.classList.remove('full-screen');
    body.classList.remove('login-popup');
  }

  open(content, type?) {
    if (type === 'sm') {
        console.log('aici');
        this.modalService.open(content, { size: 'sm' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    } else {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
}

private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
}


  signInWithFB() {
    if(!this.user) {
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
      this.pressedFBButton = true
    } else {
      this.auth.FBlogin(this.user).subscribe(
        (token) => {
          this.router.navigate(['/rentals'])
        },
        (errorResponse: HttpErrorResponse) => {
          // this.zone.run(() => { // In order to detect changes here immidiately.
          //   this.errors = errorResponse.error.errors
          // })
          this.errors = errorResponse.error.errors
          this.ref.detectChanges() // In order to detect changes here immidiately.
        }
      )
    }
  } 

  seeFBLoginState() {
    return this.socialAuthService.authState.subscribe((user) => {
      this.user = user
      this.isFBloggedIn = (this.user != null);

      if(this.pressedFBButton && this.user) {
        this.signInWithFB()
      }
    })
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', 
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]],
      password: ['', Validators.required]
    })
  }

  isInvlidForm(fieldname): boolean {
    return this.loginForm.controls[fieldname].invalid && 
           (this.loginForm.controls[fieldname].dirty || 
           this.loginForm.controls[fieldname].touched)
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      (token) => {
        this.modalService.dismissAll()

        let titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice( 1 );
        if(titlee === ""){
          this.router.navigate(['/rentals'])
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors
      }
    )
  }
}
