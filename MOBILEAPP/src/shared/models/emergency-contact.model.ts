import {Contact, IContactField} from "ionic-native";
export class EmergencyContact {
    name: string;
    phone: IContactField[];

    constructor() {}

    static fromContact(contact: Contact): EmergencyContact {
        let emergencyContact = new EmergencyContact();
        emergencyContact.name = contact.name.givenName.toString() + " " + contact.name.familyName.toString();
          emergencyContact.phone = contact.phoneNumbers;
        return emergencyContact;
    }


}
