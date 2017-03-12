import {Component, ViewChild} from "@angular/core";
import {Segment} from 'ionic-angular';

@Component({
  templateUrl: 'typeuser.html'
})

export class TypeUser {
  @ViewChild(Segment) segment: Segment;

  onDutyToggled = false;

  constructor() {

  }



  notifyOnDuty() {
    console.log(this.onDutyToggled);
  }

}

