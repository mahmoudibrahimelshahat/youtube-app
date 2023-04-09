import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    RatingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    ToastModule
  ],
  exports:[
    TableModule,
    RatingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    ToastModule
  ]
})
export class SharedModule { }
