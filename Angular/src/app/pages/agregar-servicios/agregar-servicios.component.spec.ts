import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarServiciosComponent } from './agregar-servicios.component';

describe('AgregarServiciosComponent', () => {
  let component: AgregarServiciosComponent;
  let fixture: ComponentFixture<AgregarServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarServiciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
