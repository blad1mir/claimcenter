import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.scss']
})
export class ExpedientesComponent implements OnInit {
  public searchTerm: string = '';
  public listado_expedientes: any[] = [];
filtered_expedientes: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  

}
