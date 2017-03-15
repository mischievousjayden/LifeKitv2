/**
 * Created by roy_f on 3/14/2017.
 */

import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {environment} from "../../environment/environment";
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import {Emergency} from "../models/emergency.model";


@Injectable()
export class EmergenecyService {

  constructor (
    private apiService: ApiService,
    private http: Http,
    private jwtService: JwtService
  ) {}

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
