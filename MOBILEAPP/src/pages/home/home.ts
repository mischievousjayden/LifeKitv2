import {Component, ChangeDetectorRef, ViewChild} from "@angular/core";
import {BluetoothSerial} from 'ionic-native';
import {Platform, DeepLinkMetadata, NavController} from 'ionic-angular';
import {deepLinkConfig} from "../../app/app.module";
import {OpioidUsers}from '../opioid-users/opioidusers'

@Component({
    templateUrl: 'home.html'
})


export class Home {
  rootPage = OpioidUsers;
  menu: Array<DeepLinkMetadata>;
  public discoveredBluetoothDevices: any [];
  public bluetoothData: any;
    constructor(public navCtrl: NavController, public platform: Platform, public ref: ChangeDetectorRef) {
      this.menu = deepLinkConfig.links;
      navCtrl.setRoot('home');
    }
}
