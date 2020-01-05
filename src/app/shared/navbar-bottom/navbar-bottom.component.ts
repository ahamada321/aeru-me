import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Rental } from 'src/app/rental/service/rental.model';
import { MyOriginAuthService } from 'src/app/auth/service/auth.service';


//t = current time
//b = start value
//c = change in value
//d = duration
var easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
}
@Component({
    selector: 'app-bottom-navbar',
    templateUrl: './navbar-bottom.component.html',
    styleUrls: ['./navbar-bottom.component.scss']
})
export class NavbarBottomComponent implements OnInit {
    @Input() rental: Rental;
    private toggleButton: any;
    private sidebarVisible: boolean;
    private headerOffset: number = 75; // want to replace like DEFINE HEADER_OFFSET


    constructor(
        public location: Location, 
        private element : ElementRef,
        public auth: MyOriginAuthService,
        ) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        // const navbar: HTMLElement = this.element.nativeElement;
        // this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }
    // sidebarOpen() {
    //     const toggleButton = this.toggleButton;
    //     const html = document.getElementsByTagName('html')[0];
    //     setTimeout(function(){
    //         toggleButton.classList.add('toggled');
    //     }, 500);
    //     html.classList.add('nav-open');

    //     this.sidebarVisible = true;
    // };
    // sidebarClose() {
    //     const html = document.getElementsByTagName('html')[0];
    //     // console.log(html);
    //     this.toggleButton.classList.remove('toggled');
    //     this.sidebarVisible = false;
    //     html.classList.remove('nav-open');
    // };
    // sidebarToggle() {
    //     // const toggleButton = this.toggleButton;
    //     // const body = document.getElementsByTagName('body')[0];
    //     if (this.sidebarVisible === false) {
    //         this.sidebarOpen();
    //     } else {
    //         this.sidebarClose();
    //     }
    // };

    smoothScroll(target) {
        let targetScroll = document.getElementById(target);
        this.scrollTo(document.scrollingElement || document.documentElement, targetScroll.offsetTop - this.headerOffset, 625); // Updated by Creative Tim support!
      }
      scrollTo(element, to, duration) {
        var start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;
  
        var animateScroll = function(){
            currentTime += increment;
            var val = easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }
}
