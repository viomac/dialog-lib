import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLibComponent } from './dialog-lib.component';

describe('DialogLibComponent', () => {
  let component: DialogLibComponent;
  let fixture: ComponentFixture<DialogLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
