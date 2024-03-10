import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStudentsComponent } from './card-students.component';

describe('CardStudentsComponent', () => {
  let component: CardStudentsComponent;
  let fixture: ComponentFixture<CardStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardStudentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
