import {Component} from "@angular/core";
import {Flashlight, Vibration} from "ionic-native";
import {App, NavController} from "ionic-angular";
import {Emergency} from "../emergency";
import {Observable} from "rxjs";

@Component({
    templateUrl: 'request.html'
})
export class EmergencyRequest {
  //Time limit in seconds
  public static TIME_LIMIT = 2;
  public timer:Observable<any> = Observable.timer(0,1000);
  public timerOb:any;
  public currentTime:number = EmergencyRequest.TIME_LIMIT;

    constructor(public navCtrl:NavController, public app: App) {

    }

  ngOnInit(){
    //start the timer count
    console.log('ngoninit ran');
    this.timerOb=this.timer.subscribe(t=>{
      this.currentTime = this.currentTime - 1;
      if(this.currentTime==0){
        //stop the subscription and then.... start the next page with the alert.
        if(this.timerOb){
          this.timerOb.unsubscribe();
          //move to the next page
          this.navCtrl.push('elocator');
        }
      }
    });
  }

  cancelRequest(){
    if(this.timerOb){
      this.timerOb.unsubscribe();
    }
    this.navCtrl.pop();
  }
}
