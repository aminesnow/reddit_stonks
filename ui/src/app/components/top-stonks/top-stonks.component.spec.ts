import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStonksComponent } from './top-stonks.component';

describe('TopStonksComponent', () => {
  let component: TopStonksComponent;
  let fixture: ComponentFixture<TopStonksComponent>;

  beforeEach(async(() => {
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
