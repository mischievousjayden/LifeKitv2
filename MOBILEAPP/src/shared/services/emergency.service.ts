/**
 * Created by roy_f on 3/14/2017.
 */

import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Observable, Observer} from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {environment} from "../../environment/environment";
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import {Emergency, ResponderCordinate} from "../models/emergency.model";
import {Address} from "../models/user-setting.model";
import {Geolocation, Geoposition} from "ionic-native";


@Injectable()
export class EmergenecyService {

  public hostingEmergencyId;

  constructor (
    private apiService: ApiService,
    private http: Http,
    private jwtService: JwtService
  ) {}



  //untested khoi
  getEmergencyStatus(emergencyId):Observable<Array<ResponderCordinate>>{
    let path = `/emergency/status?accesstoken=${this.jwtService.getAccessToken()}&${emergencyId}`;
    return(this.apiService.get(path).map(res=>{
      var responderList:Array<ResponderCordinate> = new Array<ResponderCordinate>();
      responderList = res.result;
      console.log(responderList);
      return(responderList);
    }));
  }

  endEmergency(){
    if(this.hostingEmergencyId){
      let path = `/emergency/end?accesstoken=${this.jwtService.getAccessToken()}`;
      let body = new URLSearchParams();
      body.set('emergencyid',this.hostingEmergencyId);
      return(this.apiService.put(path,body).map(res=>{
        this.hostingEmergencyId = null;
        //for now return res
        return(res);
      }));
    }
  }

  startEmergency(userName:string, address:Address, geo:Geoposition):Observable<number>{
    let path = `/emergency/start?accesstoken=${this.jwtService.getAccessToken()}`;
    let body = new URLSearchParams();
    body.set('lat',geo.coords.latitude.valueOf()+"");
    body.set('lng',geo.coords.longitude.valueOf()+"");
    body.set('user_nickname', userName);
    body.set ('address',JSON.stringify(address));
    return(this.apiService.post(path,body).map(res=>{
      this.hostingEmergencyId = res.result;
      return(res.result);}));
  }

  updateCarrierLocation(lat:number, lng: number): Observable<Emergency> {
    let path = `/update/location?accesstoken=${this.jwtService.getAccessToken()}`;
    let body = new URLSearchParams();
    body.set('lat',lat.toString());
    body.set('lng',lng.toString());
    return this.apiService.post(path,body);
  }

  reportOnDuty(lat:number,lng:number):Observable<Array<Emergency>>{
    let path = `/emergency/onduty?accesstoken=${this.jwtService.getAccessToken()}&lat=${lat}&lng=${lng}`;
    return this.apiService.get(path).map(res=>{
      var emergencies: Array<Emergency>= new Array();
      var array = res.result;
      array.forEach(function(res:Emergency){
        emergencies.push(res);
      });
      return(emergencies);
      }
    );
  }

}
