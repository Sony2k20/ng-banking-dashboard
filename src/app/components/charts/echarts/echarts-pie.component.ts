import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { NbJSThemeOptions, NbThemeService } from "@nebular/theme";

@Component({
  selector: "ngx-echarts-pie",
  template: ` <div #pieChart class="echart"></div> `,
})
export class EchartsPieComponent
  implements AfterViewInit, OnDestroy, OnChanges
{
  @Input()
  private data: any[];
  private options: any;
  private themeSubscription: any;
  private myChart: any;

  themeConfig: any;

  @ViewChild("pieChart")
  pieChart?: ElementRef;
  option: any;

  constructor(private theme: NbThemeService) {}

  ngAfterViewInit() {
    this.myChart = echarts.init(this.pieChart.nativeElement);

    this.themeSubscription = this.theme
      .getJsTheme()
      .subscribe((themeConfig) => {
        //TODO
        this.themeConfig = themeConfig;
        this.options = this.configureOptions(themeConfig);
        this.myChart.setOption(this.options);
      });
  }

  ngOnChanges() {
    if (this.myChart) {
      const colors = this.themeConfig.variables;
      const echarts: any = this.themeConfig.variables.echarts;

      const test = {
        backgroundColor: "#ffffff",
        color: ["#ffc94d", "#42aaff", "#ff708d", "#2ce69b", "#598bff"],
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: this.data,
          textStyle: {
            color: "#1a2138",
          },
        },
        series: [
          {
            animationDelay: 500,
            hoverAnimation: false,
            cursor: "cursor",
            name: "Countries",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            data: this.data,
            itemStyle: {
              borderWidth: 2,
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
          },
        ],
      };

      console.log(test);
      this.myChart.setOption(test);
    }
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private configureOptions(config: NbJSThemeOptions): any {
    const colors = config.variables;
    const echarts: any = config.variables.echarts;
    this.option = {
      backgroundColor: echarts.bg,
      color: [
        colors.warningLight,
        colors.infoLight,
        colors.dangerLight,
        colors.successLight,
        colors.primaryLight,
      ],
      tooltip: {
        trigger: "item",
        formatter: "{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["USA", "Germany", "France", "Canada", "Russia"],
        textStyle: {
          color: echarts.textColor,
        },
      },
      series: [
        {
          animationDelay: 500,
          hoverAnimation: false,
          cursor: "cursor",
          name: "Countries",
          type: "pie",
          // radius: "80%",
          // center: ["50%", "50%"],
          radius: ["40%", "70%"],
          avoidLabelOverlap: true,
          data: [
            {
              value: 2,
              name: "Einnahmen",
            },
            {
              value: 2479.289999999999,
              name: "asd",
            },
          ],
          itemStyle: {
            // borderColor: "#fff",
            borderWidth: 2,
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: echarts.itemHoverShadowColor,
            },
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
        },
      ],
    };
    console.log(this.option);
    return this.option;
  }
}
