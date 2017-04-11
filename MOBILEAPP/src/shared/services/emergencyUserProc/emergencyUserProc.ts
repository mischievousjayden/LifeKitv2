import {FlashLightProc} from "./flashlightProc";
import {VibrateProc} from "./vibrateProc";
import {BeepingProc} from "./beepingProc";
import {CountDownProc} from "./countDownProc";
import {SMSAllEmergencyContactsProc} from "./smsAllEmergenecyContactsProc";
import {Emergency} from "../../../pages/emergency/emergency";
import {EmergencyService} from "../emergency.service";
import {UserSettingsService} from "../user-settings.service";
import {UserSettings, Address} from "../../models/user-setting.model";
import {Geolocation, Geoposition} from "ionic-native";
import {DeviceService} from "../device.service";
export class EmergencyUserProc {

  public flashLightProc: FlashLightProc = new FlashLightProc();
  public vibrateProc: VibrateProc = new VibrateProc();
  public beepingProc: BeepingProc = new BeepingProc();
  public countDownProc:CountDownProc = new CountDownProc();
  public smsAllEmergencyContactsProc: SMSAllEmergencyContactsProc = new SMSAllEmergencyContactsProc(this.userSettingService,this.deviceService);

  public userSettings:UserSettings;

  constructor(public deviceService:DeviceService,public userSettingService: UserSettingsService, public emergencyService:EmergencyService){
  this.userSettings = userSettingService.loadUserSettings();
}
  public startEmergencyProc(){
    this.flashLightProc.startFlashing();
    this.vibrateProc.startVibrate();
    this.beepingProc.startBeepingProc();
    this.countDownProc.startTimerTillEnd().then(()=>{
      console.log('count down reached!');
      Geolocation.getCurrentPosition().then(geo=>{
        console.log('geolocation found preparing to notify server and contacts...');
        this.startEmergencyWithServer(geo);
        this.smsAllEmergencyContactsProc.contactAllEmergencyContacts(geo);
      });
    });

  }

  public stopEmergencyProc(){
    this.flashLightProc.stopFlashing();
    this.vibrateProc.stopVibrate();
    this.beepingProc.stopBeepingProc();
    this.endEmergencyWithServer();
  }

  public endEmergencyWithServer(){
    this.emergencyService.endEmergency();
  }

  public startEmergencyWithServer(geolocation:Geoposition){
    let addr: Address;
    try{
      this.userSettings = this.userSettingService.loadUserSettings();
      if(this.userSettings.addresses !=null){
        addr = this.userSettings.addresses[0];
        this.emergencyService.startEmergency(this.userSettings.firstName,addr,geolocation);
      }else{
        this.emergencyService.startEmergency(this.userSettings.firstName,null,geolocation);
      }
      console.log('Successfully sent emergency...')
    }catch(e){
      console.log('Server: failed to send emergency.')
    }
  }




}
