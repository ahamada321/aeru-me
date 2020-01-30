import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyOriginAuthService } from 'src/app/auth/service/auth.service';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';



@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPupupTestComponent implements OnInit, OnDestroy {
  @Output() click = new EventEmitter()
  
  isFBloggedIn: boolean
  pressedFBButton: boolean = false
  user: any

  loginForm: FormGroup
  errors: any[] = []
  notifyMessage: string = ''

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private auth: MyOriginAuthService,
              private socialAuthService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
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
        this.activeModal.close('Close click')

        let _locationExamples = this.location.path();
        const isLocationOfRentals = ( _locationExamples.split('/')[1] === 'rentals' );
        if(!isLocationOfRentals){
          this.router.navigate(['/rentals'])
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors
      }
    )
  }
}
