import {Injectable} from "@angular/core";
import {UserSettings} from "../models/user-setting.model";
/**
 * Created by roy_f on 3/16/2017.
 */
@Injectable()
export class UserSettingsService{
  public saveUserSettings(userSettings:UserSettings){
    window.localStorage['userSettings']= JSON.stringify(userSettings);
  }

  public loadUserSettings():UserSettings{
    return(window.localStorage['userSettings']);
  }
}
