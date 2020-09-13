import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExerciseRoutingModule } from './exercise-routing.module';
import { ExerciseComponent } from './exercise.component';
import { VideoModule } from '../video/video.module';
import { ChartModule } from '../chart/chart.module';


@NgModule({
  declarations: [ExerciseComponent],
  imports: [
    CommonModule,
    ExerciseRoutingModule,
    VideoModule,
    ChartModule
  ]
})
export class ExerciseModule { }
