import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { MycollectionComponent } from './mycollection/mycollection.component';
import { DiscordbotComponent } from './discordbot/discordbot.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { TraitsComponent } from './traits/traits.component';
import { FaqComponent } from './faq/faq.component';
import { SigninComponent } from './signin/signin.component';
import { GametestpageComponent } from './gametestpage/gametestpage.component';
import { ProfileComponent } from './profile/profile.component';
import { LeaderboardpageComponent } from './leaderboardpage/leaderboardpage.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: LandingComponent },
    { path: 'signup',           component: SignupComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent },
    {path: 'collection',      component: MycollectionComponent },
    {path: 'discordbot',      component: DiscordbotComponent },
    {path: 'roadmap',      component: RoadmapComponent },
    {path: 'traits',      component: TraitsComponent },
    {path: 'faq',      component: FaqComponent },
    {path: 'signin',      component: SigninComponent },
    {path: 'gameplayer',      component: GametestpageComponent },
    {path: 'user-profile',     component: ProfileComponent },
    {path: 'leaderboard',      component: LeaderboardpageComponent},
    {path: 'settings',      component: SettingsComponent},
    
]

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
