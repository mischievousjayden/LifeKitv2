import {Component, ViewChild} from "@angular/core";
import {Segment} from 'ionic-angular';
import {EmergenecyService} from "../../shared/services/emergency.service";
import {Geolocation} from "ionic-native";
import {Observable, ReplaySubject} from "rxjs";

@Component({
  templateUrl: 'typeuser.html'
})

export class TypeUser {
  @ViewChild(Segment) segment: Segment;

  public static sendingLocationInterval = 15000;
  public onDutyToggled = false;
  public onDutyToggledObserver:ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public setIntervalID;
  constructor(public emergencyService:EmergenecyService, public geo:Geolocation) {
  }

  sendLocation(){
    if(!this.onDutyToggled){
      return;
    }
    Geolocation.getCurrentPosition().then(resp=>{
      console.log("got location sending to server");
      this.emergencyService.updateCarrierLocation(resp.coords.latitude,resp.coords.longitude).subscribe(res=>{
        console.log(res);
        setTimeout(res=>{
          this.sendLocation();
        },TypeUser.sendingLocationInterval);
      },res=>{
        setTimeout(res=>{
          this.sendLocation();
        },TypeUser.sendingLocationInterval);
      });
    });
  }


  notifyOnDuty() {
    this.sendLocation();
    console.log(this.onDutyToggled);
    this.onDutyToggledObserver.next(this.onDutyToggled);
  }

}

