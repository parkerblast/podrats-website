import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GametestpageComponent } from './gametestpage.component';

describe('GametestpageComponent', () => {
  let component: GametestpageComponent;
  let fixture: ComponentFixture<GametestpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GametestpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GametestpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
