import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSsubjComponent } from './card-ssubj.component';

describe('CardSsubjComponent', () => {
  let component: CardSsubjComponent;
  let fixture: ComponentFixture<CardSsubjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSsubjComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardSsubjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
