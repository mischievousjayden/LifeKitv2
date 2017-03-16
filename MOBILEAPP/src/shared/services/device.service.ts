import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {
  Contacts, Contact, ContactName, ContactField, ContactFieldType,
  ContactFindOptions
} from "ionic-native";
import { Carrier, Device, Reading, EmergencyContact, User, SimpleMarker } from "../models";
import { Geolocation, Geoposition } from "ionic-native";
import { Observable } from 'rxjs/Rx';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ApiService } from "./api.service";

@Injectable()
export class DeviceService {

    emergencyContacts: Array<EmergencyContact> = [];
    allContacts: Array<Contact> = [];
    devices: Array<Device> = [];
    carriers: Array<Carrier> = [];
    data: any;
    currentLocation: SimpleMarker;



    constructor(public http: Http, private apiService: ApiService) {

    }

    getAllPhoneContacts():Promise<any>{
      let fields:ContactFieldType[] = ['displayName','phoneNumbers'];
      const options = new ContactFindOptions();
      options.filter = "";
      options.multiple = true;
      return(Contacts.find(fields,options));
    }

    getNaxloneCarriers(): Array<Carrier> {
        // first refresh carrier cache from google then return.
        return this.carriers;
    }

    getEmergencyContacts(): Array<EmergencyContact> {
        return this.emergencyContacts;
    }
    //use when deleting an emergency contact from the page
    removeEmergencyContact(contact:EmergencyContact){
      this.emergencyContacts.splice(this.emergencyContacts.indexOf(contact),1);
    }
    //use when adding emergency contact from the phone list
    addEmergencyContact(contact: Contact) {
        let emerg = EmergencyContact.fromContact(contact);
        this.emergencyContacts.push(emerg);
        return                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ;
    }
    //use when creating then adding the emergency contact
    createEmergencyContact(lastName, firstName, phone) {
        let contact: Contact = Contacts.create();
        contact.name = new ContactName(null, lastName, firstName);
        contact.phoneNumbers = [new ContactField("phone", phone)];
        return this.addEmergencyContact(contact);
    }

    // geolocation and maps
    getCurrentPosition(): Observable<SimpleMarker> {
        if (this.currentLocation) {
            return Observable.of(this.currentLocation);
        }
        else {
            // issue an update request on the update
            var marker = new ReplaySubject<SimpleMarker>(1);
            Geolocation.getCurrentPosition().then((resp) => {
                let pos = {
                    lat: resp.coords.latitude,
                    lng: resp.coords.longitude,
                    name: "Your location"
                }
                marker.next(pos);
                this.currentLocation = pos;
            });
            return marker.asObservable();
        }
    }


    processGooglePlaces(data): Array<SimpleMarker> {
        console.log(data);
        let accum: Array<SimpleMarker> = [];
        data.result.forEach(p => {
            accum.push({
                lat: p.geometry.location.lat,
                lng: p.geometry.location.lng,
                name: p.name
            });
        });
        return accum;
    }

    load(): Observable<any> {
        if (this.data) {
            return Observable.of(this.data);
        } else {
            return this.http.get('assets/data/map-data.json')
                .map(this.processData);
        }
    }

    // this function is not "owned" by this class, but by the load function above.
    processData(data: any) {
        this.data = data.json();
        // do any further preprocessing here, don't forget this function is not owned by this class.
        return this.data;
    }
}
