import {Component, ViewChild} from "@angular/core";
import {Segment} from 'ionic-angular';
import {EmergenecyService} from "../../shared/services/emergency.service";
import {Geolocation} from "ionic-native";
import {Observable, ReplaySubject} from "rxjs";
import {Emergency} from "../../shared/models/emergency.model";

@Component({
  templateUrl: 'typeuser.html'
})

export class TypeUser {
  @ViewChild(Segment) segment: Segment;

  public static sendingLocationInterval = 7000;
  public static ondutyInterval = 5000;
  public onDutyToggled = false;
  public onDutyToggledObserver:ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public setIntervalID;
  public sendLocationOb:Observable<any>;
  public pageReportDutyOb:Observable<any>;

  public unsubSendLocation;
  public unsubPageReport;

  public emergencies:Array<Emergency> = new Array();

  constructor(public emergencyService:EmergenecyService, public geo:Geolocation) {
  }

  ngOnInit() {
    this.onDutyToggledObserver.subscribe(res=>{
      if(res==true){
        console.log('subscribing...');
        this.sendLocationOb= Observable.timer(0,TypeUser.sendingLocationInterval);
        this.unsubSendLocation = this.sendLocationOb.subscribe(t=>{
          this.sendLocation();
        });
        this.pageReportDutyOb= Observable.timer(0,TypeUser.ondutyInterval);
        this.unsubPageReport = this.pageReportDutyOb.subscribe(t=>{
          this.pageReportOnDuty();
        });
      }else{
        console.log('suppose to unsubscribe');
        if(this.unsubSendLocation){
          console.log('unsubscribe from sending location');
          this.unsubSendLocation.unsubscribe();
        }
        if(this.unsubPageReport){
          console.log('unsubscribe from duty');
          this.unsubPageReport.unsubscribe();
        }
      }
    });
  }

  sendLocation(){
    Geolocation.getCurrentPosition().then(resp=>{
      console.log("reporting location");
      this.emergencyService.updateCarrierLocation(resp.coords.latitude,resp.coords.longitude).subscribe(res=>{
        console.log(res);
      });
    });
  }

  pageReportOnDuty(){
    Geolocation.getCurrentPosition().then(resp=>{
      console.log('reporting for duty');
      this.emergencyService.reportOnDuty(resp.coords.latitude,resp.coords.longitude).subscribe(res=>{
        console.log(res);
        this.emergencies = res;
      });
    });
  }

  // toDo: implement to send data to server
  notifyOnDuty() {
    console.log(this.onDutyToggled);
    this.onDutyToggledObserver.next(this.onDutyToggled);
  }
}

