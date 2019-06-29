import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitycommentsComponent } from './activitycomments.component';

describe('ActivitycommentsComponent', () => {
  let component: ActivitycommentsComponent;
  let fixture: ComponentFixture<ActivitycommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitycommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitycommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
