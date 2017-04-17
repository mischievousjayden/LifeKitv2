import {Component, ViewChild, ElementRef} from "@angular/core";
import {
  Flashlight, Dialogs, Vibration, Geolocation, Geoposition, SMS, GoogleMapsLatLng,
} from "ionic-native";
import {App, NavController, NavParams} from "ionic-angular";
import {UserSettingsService} from "../../../shared/services/user-settings.service";
import {EmergencyService} from "../../../shared/services/emergency.service";
import {DeviceService} from "../../../shared/services/device.service";
import {GooglePlaces} from "../../../shared/services/googleplaces.service";
import {EmergencyUserProc} from "../../../shared/services/emergencyUserProc/emergencyUserProc";

declare var google: any;

@Component({
    templateUrl: 'request.html'
})
export class EmergencyRequest {
  @ViewChild('mapCanvas') mapElement: ElementRef;
  public emergencyUserProc: EmergencyUserProc;
    constructor(public navParam: NavParams, userSettingService: UserSettingsService, emergencyService:EmergencyService, geolocation: Geolocation, public googlePlaces: GooglePlaces, public deviceService: DeviceService, public er: EmergencyService, public userSettingsService: UserSettingsService, public navCtrl:NavController, public app: App) {
      this.emergencyUserProc = new EmergencyUserProc(deviceService,userSettingService,emergencyService);
        this.emergencyUserProc.startEmergencyProc();
      app.viewWillUnload.subscribe(res=>{
        this.emergencyUserProc.stopEmergencyProc();
      });
    }

  /*ionViewDidEnter() {
    //Load your current location and nearby pharmacies.
    let mapEle = this.mapElement.nativeElement;
    let map;

    Geolocation.getCurrentPosition().then((loc:Geoposition)=>{
      map = new google.maps.Map(mapEle, {
        center: {
          lat: loc.coords.latitude,
          lng: loc.coords.longitude,
          name: 'your location'
        },
        zoom: 13
      });
      this.addToMap({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
        name: 'your location'
      },map);


      this.googlePlaces.getGooglePlaces('pharmacy',loc,1500,6).subscribe(res=> {
        console.log(res);
        console.log(res[0]);
        for(var i = 0 ; i <res.length; i ++){
          console.log(res[i]+'repeating');
            this.addToMap({
            lat: res[i].geometry.location.lat,
            lng: res[i].geometry.location.lng,
            name: res[i].name
          },map);
        }
      });
    });
  }*/

  addToMap(markerData, map) {
    let infoWindow = new google.maps.InfoWindow({
      content: `<h5>${markerData.name}</h5>`
    });

    let marker = new google.maps.Marker({
      position: markerData,
      map: map,
      title: markerData.name
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  }

  moveMarker(map, marker, moveCord: GoogleMapsLatLng, panCord:GoogleMapsLatLng){
    marker.setPosition(new google.map.LatLng(moveCord.lat,moveCord.lng));
    //map.panTo(new google.map.LatLng(panCord.lat,panCord.lng));
  }

  moveMarkerMe(map, marker, moveCord: GoogleMapsLatLng, panCord:GoogleMapsLatLng){
    marker.setPosition(new google.map.LatLng(moveCord.lat,moveCord.lng));
    map.panTo(new google.map.LatLng(panCord.lat,panCord.lng));
  }

  cancelRequest(){
    this.emergencyUserProc.stopEmergencyProc();
    this.emergencyUserProc.smsAllEmergencyContactsProc.contactAllCancelEmergency();
    let deviceTriggeredEmergency = this.navParam.get('deviceTriggeredEmergency');
    if(deviceTriggeredEmergency){
      this.navCtrl.popToRoot().then(res=>{
        deviceTriggeredEmergency = false;
      });
    }else {
      this.navCtrl.popToRoot();
      }
  }
}
