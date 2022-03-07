import { Component, OnInit } from '@angular/core';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { HttpClient } from '@angular/common/http';
import { ConditionalExpr } from '@angular/compiler';

declare let PlayFab: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private wallet_address0: string;
  private dataRequest: any;
  private updateRequest: any;
  private displayRequest: any;
  private ipfsLink: any;
  isUpdateIn = false;
  isUpdateFailed = false;
  form: any = {
    displayname: null,
  };
  options = [1, 2, 3];
  optionSelected: any;
  reqResult: any;
  assetList: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('isLoggedIn') != "True"){
        window.location.href="#/home";
      }
      this.wallet_address0 = sessionStorage.getItem('wallet');
      console.log(this.wallet_address0);
      this.UpdateAvatar();
  }
    onSubmit(){
        const { displayname} = this.form;
        this.displayRequest = {
            "DisplayName": displayname,
        };
        var loginRequest = JSON.parse(sessionStorage.getItem('result'));
        PlayFab.ClientApi.LoginWithPlayFab(loginRequest.Request, this.LoginCallBack.bind(this));
    }
    LoginCallBack(result, error){
        if (result !== null) {
        console.log("Congratulations, you have sucessfully logged in!");
        console.log(result);
        this.isUpdateIn = true;
        this.isUpdateFailed = false;
        sessionStorage.setItem('result', JSON.stringify(result));
        PlayFab.ClientApi.UpdateUserTitleDisplayName(this.displayRequest, this.FinalCallBack)
        } else if (error !== null) {
        console.log("Something went wrong with API call.");
        console.log("Here's some debug information:");
        console.log(PlayFab.GenerateErrorReport(error));
        this.isUpdateFailed = true;
        }
        }
    FinalCallBack(result, error){
        if (result !== null) {
            console.log("Congratulations, you have sucessfully updated display name!");
        } else if (error !== null) {
            console.log("Something went wrong with API call.");
            console.log("Here's some debug information:");
            console.log(PlayFab.GenerateErrorReport(error));
        }
    }
    isWalletConnected() {
        if( sessionStorage.getItem('wallet') != null) {
            return true;
        }
        else {
            return false;
        }
    }
    MyAlgoWalletManage() {
        const myAlgoWallet = new MyAlgoConnect();
        const settings = {
            shouldSelectOneAccount: true,
            openManager: true
        };
        myAlgoWallet.connect(settings)
        .then(async (accounts) => {
        // Accounts is an array that has all public addresses shared by the user
            if (accounts[0] != null) {

            this.wallet_address0 = accounts[0].address;
            sessionStorage.setItem('wallet', this.wallet_address0);

            // grab all asset data from FG and userwallet address
            await this.SendAccountData();
            }
        })
        .catch((err) => {
            console.error(err);
        });
    }
    MyAlgoWalletConnect() {
        const myAlgoWallet = new MyAlgoConnect();
        const settings = {
            shouldSelectOneAccount: true,
            openManager: false
        }
        myAlgoWallet.connect(settings)
        .then(async (accounts) => {
        // Accounts is an array that has all public addresses shared by the user
            if (accounts[0] != null) {

            this.wallet_address0 = accounts[0].address;
            sessionStorage.setItem('wallet', this.wallet_address0);

            // grab all asset data from FG and userwallet address
            await this.SendAccountData();
            }
        })
        .catch((err) => {
            console.error(err);
        });
    }
    SendAccountData() {
        var loginRequest = JSON.parse(sessionStorage.getItem('result'));
        PlayFab.ClientApi.LoginWithPlayFab(loginRequest.Request, this.SaveDataCallBack.bind(this));
    }
    SaveDataCallBack(result, error){
        if (result !== null) {
        console.log("Congratulations, you have sucessfully logged in!");
        sessionStorage.setItem('result', JSON.stringify(result));
        if (result.data.InfoResultPayload.PlayerProfile.AvatarUrl.split(',')[1] == null){
            console.log('was found null');
            this.updateRequest = {
                "ImageUrl": this.wallet_address0
            };
        }
        else{
            this.updateRequest = {
                "ImageUrl": this.wallet_address0 + "," + result.data.InfoResultPayload.PlayerProfile.AvatarUrl.split(',')[1]
            };
        }
        this.dataRequest = {
            "Data": {"wallet": this.wallet_address0}
        };
        PlayFab.ClientApi.UpdateAvatarUrl(this.updateRequest, this.UpdateCallBack.bind(this));
        PlayFab.ClientApi.UpdateUserData(this.dataRequest, this.ImageCallBack.bind(this));
        } else if (error !== null) {
        console.log("Something went wrong with API call.");
        console.log("Here's some debug information:");
        console.log(PlayFab.GenerateErrorReport(error));
        }
    }
    UpdateCallBack(result, error){
        if (result !== null) {
        console.log("Congratulations, you have sucessfully updated player!");
        console.log(this.wallet_address0);
        this.UpdateAvatar();
        } else if (error !== null) {
        console.log("Something went wrong with API call.");
        console.log("Here's some debug information:");
        console.log(PlayFab.GenerateErrorReport(error));
        }   
    }
    UpdateAvatar(){
        this.assetList = [];
        this.http.get<any>('https://algoexplorerapi.io/v2/accounts/' + this.wallet_address0).subscribe(data =>{
            for (let i = 0; i < data.assets.length; i++) {
                if (data.assets[0].creator == 'HT7BRN25KQHYD2TP4NIKK5XFETXX4SICRHRRD3KGKBHHWZJS26D5BYXEFU' && data.assets[i].amount > 0) {
                    if(this.assetList.length < 15) {
                       this.assetList.push(data.assets[i]['asset-id']); 
                    }
                    else {
                        return;
                    }
                } 
            }
        })
    }
    onOptionsSelected(event){
        this.http.get<any>('https://algoexplorerapi.io/v2/assets/' + event).subscribe(data =>{
            this.ipfsLink = 'https://ipfsgateway.randgallery.com/ipfs/' + data.params.url.split('/')[2]
            var loginRequest = JSON.parse(sessionStorage.getItem('result'));
            PlayFab.ClientApi.LoginWithPlayFab(loginRequest.Request, this.SaveImageCallBack.bind(this));
        })
    }
    SaveImageCallBack(result, error){
        if (result !== null) {
        console.log("Congratulations, you have sucessfully logged in!");
        sessionStorage.setItem('result', JSON.stringify(result));

        if (sessionStorage.getItem('wallet') != null){
            this.updateRequest = {
                "ImageUrl": this.wallet_address0 + ',' + this.ipfsLink
            };
        }
        else {
            this.updateRequest = {
                "ImageUrl": this.ipfsLink
            };
        }
        
        PlayFab.ClientApi.UpdateAvatarUrl(this.updateRequest, this.ImageCallBack);
        } else if (error !== null) {
        console.log("Something went wrong with API call.");
        console.log("Here's some debug information:");
        console.log(PlayFab.GenerateErrorReport(error));
        }
    }
    ImageCallBack(result, error){
        if (result !== null) {
        console.log("Congratulations, you have sucessfully updated player!");
        } else if (error !== null) {
        console.log("Something went wrong with API call.");
        console.log("Here's some debug information:");
        console.log(PlayFab.GenerateErrorReport(error));
        }   
    }
}
