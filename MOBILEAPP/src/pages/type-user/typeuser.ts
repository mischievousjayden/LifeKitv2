import {Component, ViewChild, ChangeDetectorRef} from "@angular/core";
import {Segment} from 'ionic-angular';
import {EmergenecyService} from "../../shared/services/emergency.service";
import {Geolocation} from "ionic-native";


@Component({
  templateUrl: 'typeuser.html'
})

export class TypeUser {
  @ViewChild(Segment) segment: Segment;
  public onDutyToggled = false;

  constructor(public ref: ChangeDetectorRef, public emergencyService:EmergenecyService, public geo:Geolocation) {
  }

  notifyOnDuty() {
    this.ref.detectChanges();
    console.log(this.onDutyToggled);
  }
}

