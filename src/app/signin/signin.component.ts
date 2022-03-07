import { Component, OnInit } from '@angular/core';
import { SubjectSubscription } from 'rxjs/internal-compatibility';

declare let PlayFab: any;


@Component({ 
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'] 
})

export class SigninComponent implements OnInit {
    test : Date = new Date();
    form: any = {
        username: null,
        password: null
      };
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    wallet_address;
    constructor() { }
    ngOnInit() {
      if(sessionStorage.getItem('isLoggedIn') == "True"){
        window.location.href="#/home";
      }
    }
    onSubmit(){
      const { username, password } = this.form;
      var loginRequest = {
        "Username": username,
        "Password": password,
        "InfoRequestParameters": {
          "GetUserData": true, 
          "GetPlayerProfile": true,
          "ProfileConstraints": {"ShowAvatarUrl": true}
        },
        "TitleId": "DEECB"
      }
      PlayFab.ClientApi.LoginWithPlayFab(loginRequest, this.LoginCallBack.bind(this));
    }
    Login(loginRequest){
      PlayFab.ClientApi.LoginWithPlayFab(loginRequest, this.LoginCallBack.bind(this));
    }
    LoginCallBack(result, error){
      if (result !== null) {
        console.log("Congratulations, you have sucessfully logged in!");
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        sessionStorage.setItem('isLoggedIn', 'True');
        sessionStorage.setItem('result', JSON.stringify(result));
        //console.log(sessionStorage.getItem('result'));
        if(result.data.InfoResultPayload.UserData.wallet != null){
          sessionStorage.setItem('wallet', result.data.InfoResultPayload.UserData.wallet.Value);
        }
        //console.log(sessionStorage.getItem('wallet'));
        this.reloadPage();
      } else if (error !== null) {
        console.log("Something went wrong with API call.");
        console.log("Here's some debug information:");
        console.log(PlayFab.GenerateErrorReport(error));
        this.isLoginFailed = true;
        this.errorMessage = PlayFab.GenerateErrorReport(error);
    }
  }
  DataCallBack(result, error){
    if (result !== null) {
      console.log("Congratulations, you have sucessfully gotten player data!");
      console.log(sessionStorage.getItem('wallet'));
    } else if (error !== null) {
      console.log("Something went wrong with API call.");
      console.log("Here's some debug information:");
      console.log(PlayFab.GenerateErrorReport(error));
    }
  }
  reloadPage(): void {
    window.location.href="#/home";
  }
}
