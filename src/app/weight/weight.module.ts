import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeightRoutingModule } from './weight-routing.module';
import { WeightComponent } from './weight.component';
import {NgApexchartsModule} from 'ng-apexcharts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [WeightComponent],
  imports: [
    CommonModule,
    WeightRoutingModule,
    NgApexchartsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class WeightModule { }
