import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';

@Component({
  selector: 'e-locator',
  templateUrl: 'elocator.html'
})
export class Elocator {
  // toDO: implement method to get patient and naloxone locators
  locators = [{
    name: 'CVS',
    address : '1286 Chestnut, PA',
    phone: '+1 215-834-8222',
    hours: 'Open: 8AM-11PM'
  }, {
    name: 'Rite aids',
    address : '1633 Chestnut, PA',
    phone: '+1 215-987-2354',
    hours: 'Open: 8AM-10PM'
  }];


  patient = {
    name: 'Micheal Lex',
    address: '1011 Chestnut, Unit 1, PA',
    phone: '+1 215-232-5435'
  };

  constructor(public navCtrl: NavController) {

  }

  call(phoneNumber) {
    phoneNumber = encodeURIComponent(phoneNumber);
    window.location.assign("tel:"+phoneNumber) ;

  }

  openMap(address){
    // toDO: implement how to open map
  }


}
