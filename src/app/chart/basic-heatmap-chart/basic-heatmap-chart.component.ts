import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: any;
};

@Component({
  selector: 'app-basic-heatmap-chart',
  templateUrl: './basic-heatmap-chart.component.html',
  styleUrls: ['./basic-heatmap-chart.component.scss']
})
export class BasicHeatmapChartComponent implements OnInit {
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Sat',
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Fri',
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Thu',
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Wed',
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Tue',
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Mon',
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Sun',
          data: this.generateData(18, {
            min: 0,
            max: 90
          })
        }
      ],
      chart: {
        height: 350,
        type: 'heatmap'
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#fb0000'],
      title: {
        text: 'Activity Log'
      }
    };
  }

  ngOnInit(): void {
    console.log(this.chartOptions.series);
  }

  public generateData(count, yrange) {
    let i = 0;
    const series = [];
    while (i < count) {
      const x = 'w' + (i + 1).toString();
      const y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x,
        y
      });
      i++;
    }
    return series;
  }

}
