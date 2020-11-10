import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip
} from 'ng-apexcharts';
import { dataSeries } from './data-series';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../core/services/auth/auth.service';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit {
  public series: ApexAxisChartSeries;
  public chart: ApexChart;
  public dataLabels: ApexDataLabels;
  public markers: ApexMarkers;
  public title: ApexTitleSubtitle;
  public fill: ApexFill;
  public yaxis: ApexYAxis;
  public xaxis: ApexXAxis;
  public tooltip: ApexTooltip;

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.initChartData();
  }

  public initChartData(): void {
    let ts2 = 1484418600000;
    const dates = [];
    for (let i = 0; i < 120; i++) {
      ts2 = ts2 + 86400000;
      dates.push([ts2, dataSeries[1][i].value]);
    }

    this.series = [
      {
        name: 'XYZ MOTORS',
        data: dates
      }
    ];
    this.chart = {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    };
    this.dataLabels = {
      enabled: false
    };
    this.markers = {
      size: 0
    };
    this.title = {
      text: 'Stock Price Movement',
      align: 'left'
    };
    this.fill = {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    };
    this.yaxis = {
      labels: {
        formatter(val) {
          return (val / 1000000).toFixed(0);
        }
      },
      title: {
        text: 'Price'
      }
    };
    this.xaxis = {
      type: 'datetime'
    };
    this.tooltip = {
      shared: false,
      y: {
        formatter(val) {
          return (val / 1000000).toFixed(0);
        }
      }
    };
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      weight: ['', [Validators.required, Validators.maxLength(3), Validators.pattern('^[0-9]{1,3}')]]
    });
  }

  onSubmit() {
    console.log(this.formGroup.get('weight').value);
  }
}
