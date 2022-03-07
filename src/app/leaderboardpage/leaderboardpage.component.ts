import { Component, OnInit } from '@angular/core';
declare let PlayFab: any;

@Component({
  selector: 'app-leaderboardpage',
  templateUrl: './leaderboardpage.component.html',
  styleUrls: ['./leaderboardpage.component.css']
})
export class LeaderboardpageComponent implements OnInit {

  leaderboard: any[];

  constructor() { }

  ngOnInit(): void {
    this.GetLB();
  }
  GetLB(){
      var loginRequest = {
        "Username" : "Leaderboard1234",
        "Password" : "2fZ6r7HCJ%eu",
        "TitleId" : "DEECB"
      }
      PlayFab.ClientApi.LoginWithPlayFab(loginRequest, this.LeaderboardCallBack.bind(this));
      
  }
  LeaderboardCallBack(result, error) {
    if (result !== null) {
      console.log("Congratulations, you have sucessfully logged in!");
      var leaderboardRequest = {
        "StatisticName": "HighScore",
        "MaxResultsCount": 25,
        "ProfileConstraints": {"ShowAvatarUrl": true, "ShowDisplayName": true,}
      }
      PlayFab.ClientApi.GetLeaderboard(leaderboardRequest, this.FinalCallBack.bind(this));
    } else if (error !== null) {
      console.log("Something went wrong with API call.");
      console.log("Here's some debug information:");
      console.log(PlayFab.GenerateErrorReport(error));
    }
  }
  FinalCallBack(result, error){
    if (result !== null) {
      console.log("Congratulations, leaderboard was got!");
      this.leaderboard = result.data.Leaderboard;
      [this.leaderboard[0], this.leaderboard[1]] = [this.leaderboard[1], this.leaderboard[0]];
    } else if (error !== null) {
      console.log("Something went wrong with API call.");
      console.log("Here's some debug information:");
      console.log(PlayFab.GenerateErrorReport(error));
    }
  }
}