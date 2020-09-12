import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicHeatmapChartComponent } from './basic-heatmap-chart/basic-heatmap-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [BasicHeatmapChartComponent],
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  exports: [BasicHeatmapChartComponent]
})
export class ChartModule { }
