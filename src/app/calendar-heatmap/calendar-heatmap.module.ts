import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarHeatmapComponent } from './calendar-heatmap.component';
import { CalendarHeatmap } from 'angular2-calendar-heatmap';

@NgModule({
  declarations: [
    CalendarHeatmapComponent
    // CalendarHeatmap
  ],
  exports: [
    CalendarHeatmapComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CalendarHeatmapModule { }
