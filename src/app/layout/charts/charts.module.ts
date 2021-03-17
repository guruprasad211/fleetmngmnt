import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { PageHeaderModule } from '../../shared';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { GaugeChartComponent } from './gauge-chart/gauge-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { GMapsComponent } from './g-maps/g-maps.component';
import { TempLineChartComponent } from './temp-line-chart/temp-line-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule, Ng2Charts, ChartsRoutingModule, PageHeaderModule,
    NgApexchartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAfmCKFwSGeiP8bi_KuN7ZF0PlYcQdzLfI' // AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw
    })
  ],
  declarations: [ChartsComponent, GaugeChartComponent, LineChartComponent, GMapsComponent, TempLineChartComponent]
})
export class ChartsModule { }
