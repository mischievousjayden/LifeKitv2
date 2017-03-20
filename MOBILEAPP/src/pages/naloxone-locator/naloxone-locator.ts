import { Component, ViewChild, ElementRef } from "@angular/core";
import { Platform } from "ionic-angular";
import { DeviceService } from "../../shared";
import { Geoposition, Geolocation } from "ionic-native";
import { SimpleMarker } from "../../shared/models";
import {GooglePlaces} from "../../shared/services/googleplaces.service";
import {GooglePlace} from "../../shared/models/GooglePlace";

declare var google: any;

@Component({
    templateUrl: 'naloxone-locator.html'
})
export class NaloxoneLocator {
  test:any = new Array();


  @ViewChild('mapCanvas') mapElement: ElementRef;
    constructor(public googlePlaces: GooglePlaces, private deviceService: DeviceService, private platform: Platform) {
    }

    ionViewDidLoad() {
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


          this.googlePlaces.getGooglePlaces('pharmacy',loc,9000,6).subscribe(res=> {
            console.log(res);
              res.forEach(element=>{
                console.log(map+'repeating');
                this.addToMap({
                  lat: element.geometry.location.lat,
                  lng: element.geometry.location.lng,
                  name: element.name
                },map);
              });
            });
        });
    }

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

}
