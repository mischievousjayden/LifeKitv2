import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Emergency} from "../emergency";
import {EmergenecyService} from "../../../shared/services/emergency.service";
import {EmergencyComment} from "../../../shared/models/EmergencyComment.model";

@Component({
    templateUrl: 'endscreen.html'
})
export class EndScreen {
  public emergencyId;
  public emergencyComment: EmergencyComment = new EmergencyComment();
    constructor(public params:NavParams,public navCtrl:NavController, public er:EmergenecyService) {
      this.emergencyId = params.get('emergencyId');
    }

  finish(){
    //send the comment
    var send = {

    };
    this.er.commentEmergency(this.emergencyId,JSON.stringify(this.emergencyComment)).subscribe(res=>{
      alert("Thanks for commenting!");
      this.navCtrl.popToRoot();
    });
  }

  cancel(){
    this.navCtrl.pop();
  }
}
