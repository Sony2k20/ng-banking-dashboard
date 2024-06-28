import { Component, ViewChild, ElementRef } from "@angular/core";
import * as Papa from "papaparse";
import { DkbFields } from "../../shared/enums/dkb-fields";
import {CommerzbankFields} from "../../shared/enums/commerzbank-fields";

type ParsedData<T> = {
  [key in keyof T]?: string;
};

@Component({
  selector: "ngx-dashboard",
  styleUrls: ["./dashboard.component.scss"],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent {
  @ViewChild("fileImportInput", { static: false }) fileImportInput: ElementRef;

  DkbFields = DkbFields;
  CommerzbankFields = CommerzbankFields;

  revenue: number = 0;
  outgoings: number = 0;
  data: any[];

  constructor() {}

  fileChangeListener<T>(event: any, fields: T): void {
    if (!event.target.files) {
      return;
    }

    const file: File = event.target.files[0];
    new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          const data: ParsedData<T>[] = result.data as ParsedData<T>[];
          data.forEach((element: ParsedData<T>) => {
            const amount = element[fields["Amount"]];
            const parsedAmount = parseFloat(
              amount.replace(".", "").replace(",", ".")
            );

            this.calculateBudget(parsedAmount);
            // console.log(parsedAmount);
            // console.log(this.outgoings);
          });

          this.data = [
            { value: this.revenue, name: "Einnahmen" },
            { value: this.outgoings, name: "Ausgaben" },
          ];

          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  private calculateBudget(amount: number): any {
    if (amount > 0) {
      this.revenue = this.revenue + amount;
    } else {
      this.outgoings = this.outgoings - amount;
    }
  }
}
