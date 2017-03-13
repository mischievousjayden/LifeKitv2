import {Component} from "@angular/core";
import {CarrierSettingsModel} from '../shared/models/carrier-settings/carrier-settings.model';
import { ViewController } from 'ionic-angular';
import {BluetoothService} from "../../shared/services/bluetooth.service";

import { Chart } from "chart.js";
import {App} from "ionic-angular";

@Component({
    selector: 'opioid-users',
    templateUrl: 'opioidusers.html'
})

export class OpioidUsers {
  public static UPDATE_FREQ:number = 5;
  bluetoothData = "";
  updateFreq: number = 0;
  lineCanvas : any;
  lineChart: any;

  count = 3;

  carrierSetting = {
    onDuty: false,

    hasNaloxone: false
  };

  constructor(public viewCtrl: ViewController) {

    BluetoothService.bluetoothData.subscribe(data=>{
        if(data.respirPulse > 0) {
           this.updateChart(data);
         }else{
          if(this.updateFreq>=OpioidUsers.UPDATE_FREQ){
            this.updateChart(data);
            this.updateFreq = 0;
          }
           this.updateFreq++;
        }
    });
  }

  ngAfterViewInit() {
    this.lineCanvas = document.getElementById('lineCanvas');
    this.loadChart();
  }


  updateChart(data) {

      document.getElementById('hello').innerHTML = data.respirPulse;
      this.lineChart.data.datasets[0].data.splice(0,2);
      this.lineChart.data.labels.splice(0,2);
      this.lineChart.data.datasets[0].data.push({ x: ++this.count, y: data.respirPulse});
      this.lineChart.data.datasets[0].data.push( {x: ++this.count, y: 0});

      this.lineChart.update();
  }

  loadChart() {
      this.lineChart = new Chart(this.lineCanvas, {
        type: 'line',
        labels: [0,1,2,3,4,5,6,7,8,9,10,11,12],
        data: {
          datasets: [{
            data: [0,1,0,1,0,1,0,1,0,1,0,1],
            strokeColor: "rgba(151,187,205,1)",
            fill: false
          }]

        },
        options: {
          responsive: true,
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: false,
              scaleLabel: {
                display: false
              },
              type: 'linear',
              position: 'bottom'
            }],
            yAxes: [{
              display: false,
              scaleLabel: {
                display: false
              },
              ticks: {
                beginAtZero: true,
                steps: 5,
                stepValue: 0.4,
                max: 2
              }
            }]
          },
        }

      });

  }


}

