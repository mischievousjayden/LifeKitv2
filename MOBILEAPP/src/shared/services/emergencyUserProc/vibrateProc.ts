import {Vibration} from "ionic-native";
/**
 * Created by roy_f on 4/10/2017.
 */

export class VibrateProc{
    vibrateTime: 1000;
    vibrateIntervalID;

  public startVibrate(){
    this.vibrateIntervalID = setInterval(function(){
    Vibration.vibrate(500);
    }, this.vibrateTime);
  }

  public stopVibrate(){
    clearInterval(this.vibrateIntervalID);
  }
}
