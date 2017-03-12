import {Component, ViewChild} from "@angular/core";
import {NavController} from "ionic-angular";
import {CarrierSettingsModel} from '../shared/models/carrier-settings/carrier-settings.model';

import {BluetoothService} from "../../shared/services/bluetooth.service";

import { Chart } from "chart.js";

@Component({
    selector: 'opioid-users',
    templateUrl: 'opioidusers.html'
})

export class OpioidUsers {
  bluetoothData = "";

  @ViewChild('lineCanvas') lineCanvas;

  lineChart: Chart;

  carrierSetting = {
    onDuty: false,
    hasNaloxone: false
  };


  constructor(public navCtrl:NavController) {
    //this.startBluetoothService();
    BluetoothService.bluetoothData.subscribe(data=>{
      this.updateChart(data);
    });
  }
  open(url){
    this.navCtrl.push(url);
  }

  updateChart(data) {
      document.getElementById('hello').innerHTML = data.respirPulse;
      this.lineChart.data.datasets[0].data.push(data.respirPulse);
      this.lineChart.update();
  }

  ionViewDidLoad() {
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
          type: 'line',
          data: {
              datasets: [{
                  fillColor: "rgba(220,220,220,0.2)",
                  strokeColor: "rgba(220,220,220,1)",
                  pointColor: "rgba(220,220,220,1)",
                  pointStrokeColor: "#fff",
                  label: 'Respiratory Rate',
                  data: [0,0,0,0]
              }]
          },
          options: {
              scales: {
                xAxes: [{
                  type: 'linear',
                  position: 'bottom'
                }]
              }
          }

      });

  }
}

