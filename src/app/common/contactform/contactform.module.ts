import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactFormService } from './service/contactform.service';
import { ContactFormComponent } from './contactform.component';


@NgModule({
    declarations: [ 
        ContactFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    exports:[ ContactFormComponent ],
    providers: [ ContactFormService ]
})
export class ContactFormModule { }
