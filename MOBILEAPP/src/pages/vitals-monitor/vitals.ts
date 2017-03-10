import {Component} from "@angular/core";
import {NavController} from "ionic-angular";

@Component({
    templateUrl: 'vitals.html'
})
export class Vitals {

    constructor(public navCtrl:NavController) {

    }
    open(url){
      this.navCtrl.push(url);
    }
}
