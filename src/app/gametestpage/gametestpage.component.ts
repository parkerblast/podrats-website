import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

declare let PlayFab: any;
declare let createUnityInstance: any;
declare let GlobalUnityInstance: any;

@Component({
    selector     : 'gametestpage',
    templateUrl  : './gametestpage.component.html',
    styleUrls    : ['./gametestpage.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class GametestpageComponent implements OnInit
{
    constructor(
        private router: Router
    )
    {
        
    }

  async ngOnInit() {
    
    var buildUrl = "assets/Elephalgo Web Build/Build";
    var config = {
      dataUrl: buildUrl + "/Elephalgo Web Build.data",
      frameworkUrl: buildUrl + "/Elephalgo Web Build.framework.js",
      codeUrl: buildUrl + "/Elephalgo Web Build.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "Elephalgos Collection",
      productName: "Elephalgo Platformer",
      productVersion: "0.1",
      devicePixelRatio: 0
    };

    let container = document.querySelector("#unity-container") || new Element();
    var canvas : HTMLElement = document.querySelector("#unity-canvas") || new HTMLElement();
    var loadingBar : HTMLElement = document.querySelector("#unity-loading-bar") || new HTMLElement();
    var progressBarFull : HTMLElement = document.querySelector("#unity-progress-bar-full") || new HTMLElement();
    var fullscreenButton : HTMLElement = document.querySelector("#unity-fullscreen-button") || new HTMLElement();
    var mobileWarning : HTMLElement = document.querySelector("#unity-warning") || new HTMLElement();

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      container.className = "unity-mobile";
      config.devicePixelRatio = 1;
      mobileWarning.style.display = "block";
      setTimeout(() => {
        mobileWarning.style.display = "none";
      }, 5000);
    } else {
      canvas.style.width = "960px";
      canvas.style.height = "600px";
    }
    loadingBar.style.display = "block";

    createUnityInstance(canvas, config, (progress: any) => {
      progressBarFull.style.width = 100 * progress + "%";
    }).then((unityInstance: any) => {
      GlobalUnityInstance = unityInstance;
      loadingBar.style.display = "none";
      fullscreenButton.onclick = () => {
        unityInstance.SetFullscreen(1);
      };
    }).catch((message: any) => {
      alert(message);
    });

  }
}
