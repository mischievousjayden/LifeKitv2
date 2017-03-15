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
      alert('Adding emergency contact ' + contact.displayName);
      this.deviceService.addEmergencyContact(contact);
    }

}
