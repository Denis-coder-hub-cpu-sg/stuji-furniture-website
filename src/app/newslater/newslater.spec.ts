import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Newslater } from './newslater';

describe('Newslater', () => {
  let component: Newslater;
  let fixture: ComponentFixture<Newslater>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newslater],
    }).compileComponents();

    fixture = TestBed.createComponent(Newslater);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
