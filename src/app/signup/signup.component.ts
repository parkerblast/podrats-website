import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
declare let PlayFab: any;

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    form: any = {
        username: null,
        email: null,
        password: null
      };
      isSuccessful = false;
      isSignUpFailed = false;
      errorMessage = '';
    constructor(private authService: AuthService) { }

    ngOnInit() {
        if(sessionStorage.getItem('isLoggedIn') == "True"){
            window.location.href="#/home";
        }
    }
    onSubmit(): void {
        const { username, email, password } = this.form;
        var loginRequest = {
            "Username": username,
            "Password": password,
            "RequireBothUsernameAndEmail": false,
            "TitleId": "DEECB"
        }
        PlayFab.ClientApi.RegisterPlayFabUser(loginRequest, this.RegisterCallBack.bind(this));
    }
    RegisterCallBack(result, error){
      if (result !== null) {
        console.log("Congratulations, you have sucessfully logged in!");
        sessionStorage.setItem('isLoggedIn', 'True');
        sessionStorage.setItem('result', JSON.stringify(result));
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.reloadPage();
      } else if (error !== null) {
        console.log("Something went wrong with API call.");
        console.log("Here's some debug information:");
        console.log(PlayFab.GenerateErrorReport(error));
        this.isSignUpFailed = true;
        this.errorMessage = PlayFab.GenerateErrorReport(error);
      }
    }
    reloadPage(): void {
      window.location.href="#/home";
    }
}
