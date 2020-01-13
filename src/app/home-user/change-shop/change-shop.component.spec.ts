import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeShopComponent } from './change-shop.component';

describe('ChangeShopComponent', () => {
  let component: ChangeShopComponent;
  let fixture: ComponentFixture<ChangeShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
