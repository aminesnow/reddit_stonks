import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllStonksComponent } from './all-stonks.component';

describe('AllStonksComponent', () => {
  let component: AllStonksComponent;
  let fixture: ComponentFixture<AllStonksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllStonksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStonksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
