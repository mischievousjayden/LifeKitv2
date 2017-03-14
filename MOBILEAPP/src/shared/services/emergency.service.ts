/**
 * Created by roy_f on 3/14/2017.
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {environment} from "../../environment/environment";
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';


@Injectable()
export class EmergenecyService {

  constructor (
    private apiService: ApiService,
    private http: Http,
    private jwtService: JwtService
  ) {}

  updateCarrierLocation(lat:number, lng: number): Observable<any> {
    let path = `/update/location?accesstoken=${this.jwtService.getAccessToken()}`;
    let body = {
      lat:lat,
      lng:lng
    };
    return this.apiService.put(path,body);
  }

  reportOnDuty(lat:number,lng:number){
    let path = `/emergency/onduty?accesstoken=${this.jwtService.getAccessToken()}&lat=${lat}&lng=${lng}`;
    return this.apiService.get(path);
  }

}
