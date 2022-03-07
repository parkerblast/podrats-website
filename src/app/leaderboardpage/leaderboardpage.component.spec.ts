import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardpageComponent } from './leaderboardpage.component';

describe('LeaderboardpageComponent', () => {
  let component: LeaderboardpageComponent;
  let fixture: ComponentFixture<LeaderboardpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
