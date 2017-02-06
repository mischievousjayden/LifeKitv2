import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
	constructor(private http: Http) {}
	
    login(user: string, password: string) {
        return this.http
               .get(`app/heroes/?user=${user}&password=${password}`)
               .map(response => response.json().data);
  }
}