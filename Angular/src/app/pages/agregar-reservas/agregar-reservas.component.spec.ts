import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarReservasComponent } from './agregar-reservas.component';

describe('AgregarReservasComponent', () => {
  let component: AgregarReservasComponent;
  let fixture: ComponentFixture<AgregarReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarReservasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
