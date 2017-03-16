import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {UserSettings} from "../../shared/models/user-setting.model";
import {UserSettingsService} from "../../shared/services/user-settings.service";

@Component({
    templateUrl: 'settings.html'
})
export class Settings {
  public userSettings:UserSettings = new UserSettings();

    constructor(public userSettingsService: UserSettingsService,public navCtrl:NavController) {
      this.userSettings = userSettingsService.loadUserSettings();
      if(!this.userSettings){
        this.userSettings = new UserSettings();
      }
    }
}
