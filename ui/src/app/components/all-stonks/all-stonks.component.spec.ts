import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStonksComponent } from './all-stonks.component';

describe('AllStonksComponent', () => {
  let component: AllStonksComponent;
  let fixture: ComponentFixture<AllStonksComponent>;

  beforeEach(async(() => {
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
