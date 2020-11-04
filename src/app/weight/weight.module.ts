import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeightRoutingModule } from './weight-routing.module';
import { WeightComponent } from './weight.component';
import {NgApexchartsModule} from 'ng-apexcharts';


@NgModule({
  declarations: [WeightComponent],
  imports: [
    CommonModule,
    WeightRoutingModule,
    NgApexchartsModule
  ]
})
export class WeightModule { }
