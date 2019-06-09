import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitycommentComponent } from './activitycomment.component';

describe('ActivitycommentComponent', () => {
  let component: ActivitycommentComponent;
  let fixture: ComponentFixture<ActivitycommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitycommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitycommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
