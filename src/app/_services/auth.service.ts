import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

declare let PlayFab : any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login(username: string, password: string) {
      var loginRequest = {
        "Username": username,
        "Password": password,
        "TitleId": "DEECB"
      }
    PlayFab.ClientApi.LoginWithPlayFab(loginRequest, this.LoginCallBack);
  }
  LoginCallBack(result, error){
    return new Promise((resolve) => {
      if (result !== null) {
        console.log("Congratulations, you made your first successful API call!");
        console.log(result);
        resolve(result);
        return result;
      } else if (error !== null) {
        console.log("Something went wrong with your first API call.");
        console.log("Here's some debug information:");
        console.log(PlayFab.GenerateErrorReport(error));
        return error;
    }
    }) 
  }

  //register(username: string, email: string, password: string): Observable<any> {
    
  //}
}