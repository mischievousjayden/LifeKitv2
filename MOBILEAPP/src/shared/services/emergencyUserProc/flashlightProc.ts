import {Flashlight} from "ionic-native";
/**
 * Created by roy_f on 4/10/2017.
 */

export class FlashLightProc{
      flashLightTime: 1000;
      flashLightIntervalID;

  public startFlashing(){
    this.flashLightIntervalID = setInterval(function(){
      Flashlight.toggle();
    }, this.flashLightTime);
  }

  public stopFlashing(){
    clearInterval(this.flashLightIntervalID);
    Flashlight.switchOff();
  }
}
