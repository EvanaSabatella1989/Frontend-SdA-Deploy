import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarRestablecerPasswordComponent } from './confirmar-restablecer-password.component';

describe('ConfirmarRestablecerPasswordComponent', () => {
  let component: ConfirmarRestablecerPasswordComponent;
  let fixture: ComponentFixture<ConfirmarRestablecerPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarRestablecerPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarRestablecerPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
