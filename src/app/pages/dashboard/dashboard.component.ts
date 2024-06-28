import { Component, Input, ViewChild } from "@angular/core";
import { NbColorHelper, NbThemeService } from "@nebular/theme";
import * as Papa from "papaparse";

@Component({
  selector: "ngx-dashboard",
  styleUrls: ["./dashboard.component.scss"],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent {
  @Input()
  source = {};

  options: any;
  data: {};
  themeSubscription: any;

  constructor() {
    // private theme: NbThemeService
    this.data = {
      labels: [
        "Eating",
        "Drinking",
        "Sleeping",
        "Designing",
        "Coding",
        "Cycling",
        "Running",
      ],
      datasets: [
        {
          data: [65, 59, 90, 81, 56, 55, 40],
          label: "Series A",
          borderColor: 2,
          backgroundColor: NbColorHelper.hexToRgbA("#516e9c", 0.5),
        },
        {
          data: [28, 48, 40, 19, 96, 27, 100],
          label: "Series B",
          borderColor: 2,
          backgroundColor: NbColorHelper.hexToRgbA("#516e9c", 0.5),
        },
      ],
    };

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      scaleFontColor: "white",
      legend: {
        labels: {
          fontColor: 1,
        },
      },
      scale: {
        // pointLabels: {
        //   fontSize: 14,
        //   fontColor: 3,
        // },
        gridLines: {
          color: 4,
        },
        angleLines: {
          color: 5,
        },
      },
    };
  }

  dkbFields = [
    "Buchungsdatum",
    "Wertstellung",
    "Status",
    "Zahlungspflichtige*r",
    "Zahlungsempfänger*in",
    "Verwendungszweck",
    "Umsatztyp",
    "IBAN",
    "Betrag (€)",
    "Gläubiger-ID",
    "Mandatsreferenz",
    "Kundenreferenz",
  ];

  @ViewChild("fileImportInput") fileImportInput: any;

  fileChangeListener($event: any): void {
    const file: File = $event.target.files[0];
    new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          console.log(result);
          console.log(result["meta"]["fields"]);
          resolve(result.data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }
}
