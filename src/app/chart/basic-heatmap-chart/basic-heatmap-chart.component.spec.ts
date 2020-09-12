import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicHeatmapChartComponent } from './basic-heatmap-chart.component';

describe('BasicHeatmapChartComponent', () => {
  let component: BasicHeatmapChartComponent;
  let fixture: ComponentFixture<BasicHeatmapChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicHeatmapChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicHeatmapChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
