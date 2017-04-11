import {Dialogs} from "ionic-native";
/**
 * Created by roy_f on 4/11/2017.
 */
export class BeepingProc{

  public beepingIntervalID;

  public startBeepingProc(){
    this.beepingIntervalID = setInterval(function(){
      Dialogs.beep(1);
    },1000);
  }

  public stopBeepingProc(){
    clearInterval(this.beepingIntervalID);
  }
}
