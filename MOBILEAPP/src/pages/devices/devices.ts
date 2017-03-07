import {Component, ChangeDetectorRef} from "@angular/core";
import {BluetoothSerial} from 'ionic-native';
import { Platform } from 'ionic-angular';
@Component({
    templateUrl: 'devices.html'
})
export class Devices {
  public discoveredBluetoothDevices: any [];
  public bluetoothData: any;
    constructor(public platform: Platform, public ref: ChangeDetectorRef) {
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
      BluetoothSerial.setDeviceDiscoveredListener().subscribe(device=>{
        this.discoveredBluetoothDevices.push(device);
        this.ref.detectChanges();
      });
      BluetoothSerial.discoverUnpaired().then(devices =>{
          this.discoveredBluetoothDevices = devices;
          this.ref.detectChanges();
        //    this.discoverUnpairedDevices();
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
        alert('connection failed');
      });
      BluetoothSerial.subscribe('\n').subscribe(data => {
        this.bluetoothData = data;
        this.ref.detectChanges();
      });
    }
}
