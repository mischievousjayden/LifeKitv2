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
  count = 3;

  carrierSetting = {
    onDuty: false,
    hasNaloxone: false
  };


  constructor(public navCtrl:NavController) {
    //this.startBluetoothService();
    BluetoothService.bluetoothData.subscribe(data=>{
      setInterval(function(){
        this.updateChart(data);
      }, 2000);

    });
  }
  open(url){
    this.navCtrl.push(url);
  }

  updateChart(data) {
      document.getElementById('hello').innerHTML = data.respirPulse;
      this.lineChart.data.datasets[0].data.push({ x: ++this.count, y: data.respirPulse});
      this.lineChart.update();
  }

  ionViewDidLoad() {
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
          type: 'line',
          data: {
              datasets: [{
                  fillColor: "rgba(151,187,205,0.2)",
                  strokeColor: "rgba(151,187,205,1)",
                  pointColor: "rgba(151,187,205,1)",
                  pointStrokeColor: "#fff",
                  label: 'Respiratory Rate',
                  data: [{
                    x: 0,
                    y: 0
                  }, {
                    x: 1,
                    y: 10
                  }, {
                    x: 2,
                    y: 5
                  }]
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

