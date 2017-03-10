import {MenuItem} from './menu-item';
import {ContactPage} from "../contacts/contact";
import {Devices} from "../devices/devices";


export const MENUS : MenuItem[] = [
  { title: 'Contacts', component: ContactPage },
  { title: 'Devices', component: Devices }
];
