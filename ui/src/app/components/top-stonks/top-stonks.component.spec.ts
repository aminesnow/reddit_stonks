import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TopStonksComponent } from './top-stonks.component';

describe('TopStonksComponent', () => {
  let component: TopStonksComponent;
  let fixture: ComponentFixture<TopStonksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TopStonksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopStonksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
