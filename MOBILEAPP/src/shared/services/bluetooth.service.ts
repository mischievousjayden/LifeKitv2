import {BluetoothSerial} from "ionic-native";
/**
 * Created by roy_f on 3/11/2017.
 */



export class BluetoothService{
  static observers: any [];
  constructor(){

  }

  public static startSubscription(delimeter:string){
    BluetoothSerial.subscribe(delimeter).subscribe(data =>{
      BluetoothService.observers.forEach(function(handler){
        handler(data);
      });
    });
  }

  public static addSubscriber(handler){
    BluetoothService.observers.push(handler);
  }
}
