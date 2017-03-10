import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {CarrierSettingsModel} from '../shared/models/carrier-settings/carrier-settings.model';

@Component({
    templateUrl: 'opioidusers.html'
})
export class OpioidUsers {

    carrierSetting = {
        onDuty: false,
        hasNaloxone: false
    };


    constructor(public navCtrl:NavController) {

    }
}

