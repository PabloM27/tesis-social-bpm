import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTopicsComponent } from './process-topics.component';

describe('ProcessTopicsComponent', () => {
  let component: ProcessTopicsComponent;
  let fixture: ComponentFixture<ProcessTopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessTopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
