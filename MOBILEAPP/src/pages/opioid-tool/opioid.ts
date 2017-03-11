import {Component} from "@angular/core";
import {interval} from "rxjs/observable/interval";
import {BluetoothSerial} from "ionic-native";

@Component({
    selector: 'page-opioid-tool',
    templateUrl: 'opioid.html'
})
export class OpioidTool {
    about: string = "tool-about";
    constructor() {
        this.about = "tool-about";
    }


}
