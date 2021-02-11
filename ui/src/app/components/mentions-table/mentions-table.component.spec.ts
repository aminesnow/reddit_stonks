import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionsTableComponent } from './mentions-table.component';

describe('MentionsTableComponent', () => {
  let component: MentionsTableComponent;
  let fixture: ComponentFixture<MentionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentionsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
