import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit, OnDestroy {
  data : Date = new Date();

  constructor() { }

  ngOnInit() {
      var navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.add('navbar-transparent');
      var body = document.getElementsByTagName('body')[0];
      body.classList.add('contact-page');
  }
  ngOnDestroy(){
      var navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.remove('navbar-transparent');
      if (navbar.classList.contains('nav-up')) {
        navbar.classList.remove('nav-up');
      }
      var body = document.getElementsByTagName('body')[0];
      body.classList.remove('contact-page');
  }

}
