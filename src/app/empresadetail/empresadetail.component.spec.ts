import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresadetailComponent } from './empresadetail.component';

describe('EmpresadetailComponent', () => {
  let component: EmpresadetailComponent;
  let fixture: ComponentFixture<EmpresadetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresadetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresadetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
