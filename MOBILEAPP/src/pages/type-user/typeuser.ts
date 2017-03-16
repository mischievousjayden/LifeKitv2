import {Component, ViewChild} from "@angular/core";
import {Segment} from 'ionic-angular';
import {EmergenecyService} from "../../shared/services/emergency.service";
import {Geolocation} from "ionic-native";
import {Observable, ReplaySubject} from "rxjs";
import {Emergency} from "../../shared/models/emergency.model";

@Component({
  templateUrl: 'typeuser.html'
})

export class TypeUser {
  @ViewChild(Segment) segment: Segment;
  public onDutyToggled = false;

  constructor(public emergencyService:EmergenecyService, public geo:Geolocation) {
  }

  notifyOnDuty() {
    console.log(this.onDutyToggled);
  }
}

