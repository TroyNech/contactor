import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDataPage } from './contact-data.page';

describe('ContactDataPage', () => {
  let component: ContactDataPage;
  let fixture: ComponentFixture<ContactDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDataPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
