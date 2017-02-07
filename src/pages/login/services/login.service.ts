import { Injectable } from '@angular/core';
import { Headers,Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {
	private loginUrl = 'http://centralark.org/LifeKit/SERVER/test.php';
	constructor(private http: Http) {}
	
    login(userName: string, passWord: string) : Promise <string> {
        return this.http.get(this.loginUrl).toPromise().then(response => response.text() as string)
		.catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

