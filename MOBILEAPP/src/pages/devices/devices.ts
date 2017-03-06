import {Component} from "@angular/core";
import { BluetoothSerial } from 'ionic-native';
import { Platform } from 'ionic-angular';

@Component({
    templateUrl: 'devices.html'
})
export class Devices {
  public discoveredBluetoothDevices: any [];
    constructor(public platform: Platform) {
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
          this.discoverUnpairedDevices();
      });
    }
    public bluetoothOff(){
      alert('Bluetooth is off...');
      //perform trying to turn it on.
      BluetoothSerial.enable().then(res=>this.bluetoothOn()).catch(res=>this.bluetoothOff());
    }
}
