import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsenseContainerComponent } from './adsense-container.component';

describe('AdsenseContainerComponent', () => {
  let component: AdsenseContainerComponent;
  let fixture: ComponentFixture<AdsenseContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsenseContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsenseContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
