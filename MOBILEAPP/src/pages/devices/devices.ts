import {Component, ChangeDetectorRef, ViewChild} from "@angular/core";
import {BluetoothSerial} from 'ionic-native';
import { Platform } from 'ionic-angular';
import { Chart } from 'chart.js';

@Component({
    templateUrl: 'devices.html'
})
export class Devices {
  @ViewChild('lineCanvas') lineCanvas;

  lineChart: any;

  public discoveredBluetoothDevices: any [];
  public bluetoothData: any;
    constructor(public platform: Platform, public ref: ChangeDetectorRef) {
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
            {
              label: "My First dataset",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [65, 59, 80, 81, 56, 55, 40],
              spanGaps: false,
            }
          ]
        }
      });


      if(this.platform.is('android')){
			alert("I am android!")
			//Call get list of connectable devices
      BluetoothSerial.isEnabled().then(res => this.bluetoothOn()).catch(res => this.bluetoothOff());
		}
    }

    public bluetoothOn(){
      alert('Bluetooth is on...');
      this.discoverUnpairedDevices();
    }

    public discoverUnpairedDevices(){
        BluetoothSerial.discoverUnpaired().then(devices =>{
          this.discoveredBluetoothDevices = devices;
          this.ref.detectChanges();
          BluetoothSerial.isConnected().catch(res =>{
            this.discoverUnpairedDevices();
          })
        });
    }
    public bluetoothOff(){
      alert('Bluetooth is off...');
      //perform trying to turn it on.
      BluetoothSerial.enable().then(res=>this.bluetoothOn()).catch(res=>this.bluetoothOff());
    }

    public connectDevice(device){
      alert('connecting to device: ' + device.id);

      //connects and subscribes to the status of the connection
      BluetoothSerial.connect(device.id).subscribe(function(){
        alert('connection success');

      },function(){
        //If disconnect then continue with discovery.
        alert('connection failed, continuing discovery');
        this.discoverUnpairedDevices();
      });
      BluetoothSerial.subscribe('\n').subscribe(data => {
        this.bluetoothData = data;
        this.ref.detectChanges();
      });
    }


}
