import {Component, ChangeDetectorRef, ViewChild} from "@angular/core";
import {BluetoothSerial} from 'ionic-native';
import {Platform, DeepLinkMetadata, NavController} from 'ionic-angular';
import {deepLinkConfig, menuLinks} from "../../app/app.module";
import {OpioidUsers}from '../opioid-users/opioidusers'

//need to add naloxonelocator

@Component({
  templateUrl: 'home.html'
})

export class Home {
  rootPage = OpioidUsers;
  menu = menuLinks;
  public discoveredBluetoothDevices: any [];
  public bluetoothData: any;
    constructor(public navCtrl: NavController, public platform: Platform, public ref: ChangeDetectorRef) {

    }
}
