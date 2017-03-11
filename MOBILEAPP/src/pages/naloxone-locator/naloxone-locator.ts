import {Component, ChangeDetectorRef, ViewChild} from "@angular/core";
import {Platform, DeepLinkMetadata, NavController} from 'ionic-angular';


//need to add naloxonelocator

@Component({
  templateUrl: 'naloxone-locator.html'
})

export class NaloxoneLocator {
    constructor(public navCtrl: NavController, public platform: Platform, public ref: ChangeDetectorRef) {

    }
}
