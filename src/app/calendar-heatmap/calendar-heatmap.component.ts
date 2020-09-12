import { Component, OnInit } from '@angular/core';
import { OverviewType } from 'angular2-calendar-heatmap';

@Component({
  selector: 'app-calendar-heatmap',
  templateUrl: './calendar-heatmap.component.html',
  styleUrls: ['./calendar-heatmap.component.scss']
})
export class CalendarHeatmapComponent implements OnInit {
  overview: OverviewType = 2;
  data = [{
    date: '2016-01-01',
    total: 17164,
    details: [
      {
        name: 'Takiase',
        date: '2016-01-01 12:30:45',
        value: 9192
      },
      {
        name: 'Plunk',
        date: '2016-01-01 13:37:00',
        value: 6753
      },
      {
        name: 'Run',
        date: '2016-01-01 17:52:41',
        value: 1219
      }]
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
