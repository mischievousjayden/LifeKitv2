import {Component} from "@angular/core";
import {DeviceService} from "../../../shared/services/device.service";

@Component({
    templateUrl: 'add-fromphone-emergency-contact.html'
})
export class AddFromPhoneEmergencyContact {
contacts: any;
    constructor(public deviceService: DeviceService) {
      deviceService.getAllPhoneContacts().then(list=>{
        this.contacts = list;
      });
    }

    public addEmergencyContact(contact){
      console.log(contact);
      alert('Adding emergency contact ' + contact.displayName);
      if(contact.phoneNumbers){
        //It has phone numbers then add...
        this.deviceService.addEmergencyContact(contact);
      }else{
        alert('Contact has no phone numbers...');
      }
    }

}
