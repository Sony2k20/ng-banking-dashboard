import { NgModule } from "@angular/core";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
} from "@nebular/theme";

import { ThemeModule } from "../../@theme/theme.module";
import { DashboardComponent } from "./dashboard.component";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from "../../components/charts/charts.module";
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,

    ChartsModule,
  ],
  declarations: [DashboardComponent, PieChartComponent],
})
export class DashboardModule {}
