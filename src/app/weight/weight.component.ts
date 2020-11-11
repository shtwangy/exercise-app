import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexGrid,
  ApexStroke
} from 'ng-apexcharts';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../core/services/auth/auth.service';
import {WeightService} from '../core/services/weight/weight.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  fill: ApexFill;
  markers: ApexMarkers;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  isShow = false;

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private weightService: WeightService
  ) {}

  public initChartData(): void {
    this.weightService.getWeightLogs(this.authService.currentUser.uid)
      .subscribe(
      res => {
        const dates = [];
        const weights = [];
        res.forEach(data => {
          dates.push(data.date);
          weights.push(data.value);
        });
        console.log(dates);
        console.log(weights);

        const max = new Date(dates[dates.length - 1]).getTime();
        const min = new Date(dates[0]).getTime();
        this.chartOptions = {
          series: [
            {
              name: 'weight',
              data: weights
            }
          ],
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              type: 'x',
              enabled: true,
              autoScaleYaxis: true
            },
            toolbar: {
              autoSelected: 'zoom'
            }
          },
          dataLabels: {
            enabled: true
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'ログ',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            }
          },
          xaxis: {
            type: 'datetime',
            categories: dates
          }
        };
        this.isShow = true;
      }
    );
  }

  ngOnInit(): void {
    this.initChartData();
    this.formGroup = this.formBuilder.group({
      weight: ['', [Validators.required, Validators.maxLength(3), Validators.pattern('^[0-9]{1,3}')]]
    });
  }

  onSubmit() {
    this.weightService.updateWeightLog(this.authService.currentUser.uid, this.formGroup.get('weight').value).subscribe();
    this.formGroup.reset();
  }
}
