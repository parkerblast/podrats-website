function UpdateScore(score) {
    var loginRequest = JSON.parse(sessionStorage.getItem('result'));
    this.score = score;
    PlayFab.ClientApi.LoginWithPlayFab(loginRequest.Request, UpdateScoreCallBack); 
}
function UpdateScoreCallBack(result, error) {
    if (result !== null) {
      console.log("Congratulations, you have sucessfully logged in!");
      var statRequest = {
        "Statistics": [{"StatisticName": "HighScore", "Value": this.score}]
      };
      PlayFab.ClientApi.UpdatePlayerStatistics(statRequest, LoginCallBack);
    } else if (error !== null) {
      console.log("Something went wrong with API call.");
      console.log("Here's some debug information:");
      console.log(PlayFab.GenerateErrorReport(error));
    }
}
function GetLB(){
  if( sessionStorage.getItem('isLoggedIn') == 'True'){
    var loginRequest = JSON.parse(sessionStorage.getItem('result'));
    PlayFab.ClientApi.LoginWithPlayFab(loginRequest.Request, LeaderboardCallBack);
  }
  else{
    console.log("Not logged in can't call Leaderboard!");
    GlobalUnityInstance.SendMessage('LeaderboardUI', 'OnGetLeaderBoard', "");
  }
    
}
function LeaderboardCallBack(result, error) {
  if (result !== null) {
    console.log("Congratulations, you have sucessfully logged in!");
    var leaderboardRequest = {
      "StatisticName": "HighScore",
      "MaxResultsCount": 10,
      //"ProfileConstraints": {"ShowAvatarUrl": true}
    }
    PlayFab.ClientApi.GetLeaderboard(leaderboardRequest, LeaderBoardCallBack);
  } else if (error !== null) {
    console.log("Something went wrong with API call.");
    console.log("Here's some debug information:");
    console.log(PlayFab.GenerateErrorReport(error));
  }
}
function LeaderBoardCallBack(result, error){
  if (result !== null) {
    console.log("Congratulations, leaderboard was got!");
    GlobalUnityInstance.SendMessage('LeaderboardUI', 'OnGetLeaderBoard', JSON.stringify(result.data));
  } else if (error !== null) {
    console.log("Something went wrong with API call.");
    console.log("Here's some debug information:");
    console.log(PlayFab.GenerateErrorReport(error));
  }
}

/* ---------------------- Normal CallBack ------------------*/
function LoginCallBack(result, error){
    if (result !== null) {
      console.log("Congratulations, API call was sucessful!");
    } else if (error !== null) {
      console.log("Something went wrong with API call.");
      console.log("Here's some debug information:");
      console.log(PlayFab.GenerateErrorReport(error));
    }
}
