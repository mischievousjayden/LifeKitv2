import {Component} from "@angular/core";
import {UserSettings} from "../../shared/models/user-setting.model";
import {UserSettingsService} from "../../shared/services/user-settings.service";

@Component({
    templateUrl: 'setting-edit.html'
})
export class SettingsEdit {
public userSettings:UserSettings = new UserSettings();
    constructor(public userSettingsService:UserSettingsService) {

    }
}
