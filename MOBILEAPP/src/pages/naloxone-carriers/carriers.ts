import {Component, Input} from "@angular/core";
import {NavController} from "ionic-angular";
import {CarrierSettingsModel} from '../shared/models/carrier-settings/carrier-settings.model';
import {Geolocation} from "ionic-native";
import {EmergenecyService} from "../../shared/services/emergency.service";
import {Emergency} from "../../shared/models/emergency.model";
import {ReplaySubject, Observable} from "rxjs";
import {TypeUser} from "../type-user/typeuser";


@Component({
    selector: 'carrier',
    templateUrl: 'carriers.html'
})

export class Carriers {
  @Input() emergencies:Array<Emergency> = new Array<Emergency>();
  @Input() onDutyToggled: boolean;

  public static sendingLocationInterval = 7000;
  public static ondutyInterval = 5000;
  public onDutyToggledObserver:ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public sendLocationOb:Observable<any>;
  public pageReportDutyOb:Observable<any>;
  public unsubSendLocation:Array<any> = new Array<any>();
  public unsubPageReport:Array<any> = new Array<any>();


  carrierSetting = {
      onDuty: true,
      hasNaloxone: true
  };


  constructor(public emergencyService:EmergenecyService, public navCtrl: NavController) {

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

  ngDoCheck(){
    if(this.onDutyToggled){
      //run run code for carrier actions
      if(this.unsubSendLocation.length==0) {
        console.log('subscribing...');
        this.sendLocationOb = Observable.timer(0, Carriers.sendingLocationInterval);
        this.unsubSendLocation.push(this.sendLocationOb.subscribe(t => {
          this.sendLocation();
        }));
      }
      if(this.unsubPageReport.length==0) {
        console.log('subscribing...');
        this.pageReportDutyOb = Observable.timer(0, Carriers.ondutyInterval);
        this.unsubPageReport.push(this.pageReportDutyOb.subscribe(t => {
          this.pageReportOnDuty();
        }));
      }
    }else{
      //run stop code for any carrier actions
      if(this.unsubSendLocation.length>0){
        console.log('unsubscribe from sending location');
        this.unsubSendLocation.forEach(function(res){
          res.unsubscribe();
        });
        this.unsubSendLocation = new Array();
      }
      if(this.unsubPageReport.length>0){
        console.log('unsubscribe from duty');
        this.unsubPageReport.forEach(function(res){
          res.unsubscribe();
        });
        this.unsubPageReport = new Array();
      }
    }
  }

  open(url){
    this.navCtrl.push(url);
  }



}
