import { Component, ViewChild, ElementRef } from "@angular/core";
import { Platform } from "ionic-angular";
import { DeviceService } from "../../shared";
import { Geoposition } from "ionic-native";
import { SimpleMarker } from "../../shared/models";
import {GooglePlaces} from "../../shared/services/googleplaces.service";

declare var google: any;

@Component({
    templateUrl: 'naloxone-locator.html'
})
export class NaloxoneLocator {


    @ViewChild('mapCanvas') mapElement: ElementRef;
    constructor(public googlePlaces: GooglePlaces, private deviceService: DeviceService, private platform: Platform) {
    }

    ionViewDidLoad() {
        let mapEle = this.mapElement.nativeElement;
        let map;

        this.deviceService.getCurrentPosition().subscribe(
            userPosition => {
                // center map on user's location
                map = new google.maps.Map(mapEle, {
                    center: userPosition,
                    zoom: 13
                });



            })
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
