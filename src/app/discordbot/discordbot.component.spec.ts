import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscordbotComponent } from './discordbot.component';

describe('DiscordbotComponent', () => {
  let component: DiscordbotComponent;
  let fixture: ComponentFixture<DiscordbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscordbotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscordbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
