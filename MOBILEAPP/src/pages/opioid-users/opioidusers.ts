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

  lineChart: any;

  carrierSetting = {
    onDuty: false,
    hasNaloxone: false
  };


  constructor(public navCtrl:NavController) {
    //this.startBluetoothService();
    BluetoothService.bluetoothData.subscribe(data=>{
      updateChart(data);
    });
  }
  open(url){
    this.navCtrl.push(url);
  }

  updateChart(data) {
      this.lineChart.data.datasets[0].data[4] = data.respirPulse;
      this.lineChart.update();
  }

  ionViewDidLoad() {
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
          type: 'line',
          data: {
              datasets: [{
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

