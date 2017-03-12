import {Component, ChangeDetectorRef} from "@angular/core";
import {BluetoothSerial} from 'ionic-native';
import {Platform, App} from 'ionic-angular';
import {BluetoothService} from "../../shared/services/bluetooth.service";
import {Observable} from "rxjs";
@Component({
    templateUrl: 'devices.html'
})
export class Devices {
public connectedDevice:any;
public discoveredBluetoothDevices: any;
public pairedBluetoothDevices: any;
public bluetoothData: any;

    constructor(public app:App,public platform: Platform, public ref: ChangeDetectorRef) {
		if(this.platform.is('android')){
			//alert("I am android!")
			//Call get list of connectable devices
      BluetoothService.discoveredBluetoothDevices.subscribe(list =>{
        this.discoveredBluetoothDevices = list;
        this.ref.detectChanges();
      });

      BluetoothService.pairedBluetoothDevices.subscribe(list=>{
        this.pairedBluetoothDevices = list;
        this.ref.detectChanges();
      });

      BluetoothService.connectedDevice.subscribe(device=>{
        this.connectedDevice = device;
        this.ref.detectChanges();
      });

      app.viewDidLoad.subscribe(()=>{
        BluetoothService.bluetoothStart();
      });
		}
    }

    connectDevice(device){
      BluetoothService.connectDevice(device);
    }




}
