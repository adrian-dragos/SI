import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";


import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent
} from 'ng-apexcharts';
import { Observable } from 'rxjs';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild("chart") chart: ChartComponent;

  public chartOptions: Partial<ChartOptions>;
  private url: string = 'http://localhost:5000/companies';
  private co2: number;
  public temp: number;
  private maxTemp = 50;
  private minTemp = -20;
  private maxCO2 = 1200;
  private minCO2 = 100;
    
  constructor(private http: HttpClient) {
    setInterval(()=> { this.fetchdata() }, 5000);
  }


  ngOnInit(): void {
    this.fetchdata();
  }


  getCompanies(): Observable<any> {
    return this.http.get(this.url);
  }

  fetchdata() {
    this.getCompanies().subscribe(
      (data) => {
        console.log(data),
        this.co2 = this.getRandomCO2(),
        this.initChar(),
        this.temp = this.getRandomTemperature()
      }
    );
  }

  getRandomCO2() {
    return Math.trunc(Math.random() * (this.maxCO2 - this.minCO2 + 1) + this.minCO2);
  }

  getRandomTemperature() {
    return Math.random() * (this.maxTemp - this.minTemp + 1) + this.minTemp;
  }

  getColor() {
    if (this.co2 <= 450) {
      return ['#00FF00']; 
    }
    else if (this.co2 > 450 && this.co2 <= 600) {
      return ['#ffff67'];
    } else if (this.co2 > 450 && this.co2 <= 800) {
      return ['#f7f700'];
    } else if (this.co2 > 800 && this.co2 <= 1100) {
      return ['#FF0000'];
    }
    
    return ['#910017']
  }

 

  initChar() {
    this.chartOptions = {
      series: [ Math.trunc(this.co2 / 10)],
      chart: {
        type: "radialBar",
        offsetY: -20,
        animations: { enabled: false}
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: "97%",
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              opacity: 0.31,
              blur: 2
            }
          },
          dataLabels: {
            name: {
              show: true
            },
            value: {
              offsetY: -200,
              fontSize: "125px",
              show: false
            }
          }
        }
      },
      fill: {
        type: "gradient",
        colors: this.getColor(),
        gradient: {
          shade: "light",
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91]
        }
      },
      labels: ["CO2\n" + this.co2 + "ppx"]
    };
  }
}
