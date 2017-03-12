import {Component} from "@angular/core";
import {Segment} from 'ionic-angular';
import {CarrierSettingsModel} from '../shared/models/carrier-settings/carrier-settings.model';

import {BluetoothService} from "../../shared/services/bluetooth.service";

import { Chart } from "chart.js";

@Component({
    selector: 'opioid-users',
    templateUrl: 'opioidusers.html'
})

export class OpioidUsers {
  bluetoothData = "";

  lineCanvas : any;
  lineChart: any;

  count = 3;

  carrierSetting = {
    onDuty: false,

    hasNaloxone: false
  };

  constructor() {

    BluetoothService.bluetoothData.subscribe(data=>{
        if(data.respirPulse > 0) {
          this.updateChart(data);
        }

    });
  }

  ngAfterViewInit() {
    this.lineCanvas = document.getElementById('lineCanvas');
    this.loadChart();
  }


  updateChart(data) {
      //document.getElementById('hello').innerHTML = data.respirPulse;
      this.lineChart.data.datasets[0].data.push([{ x: ++this.count, y: data.respirPulse}, {x: ++this.count, y: 0}]);
      this.lineChart.update();
  }

  loadChart() {
      this.lineChart = new Chart(this.lineCanvas, {
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

