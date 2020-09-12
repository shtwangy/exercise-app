import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoModule } from './video/video.module';
import { ChartModule } from './chart/chart.module';
import { CalendarHeatmapModule } from './calendar-heatmap/calendar-heatmap.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VideoModule,
    ChartModule,
    CalendarHeatmapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
