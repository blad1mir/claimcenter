import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/conexion/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileDetails } from '../core/interfaces/company';

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.scss'],
})
export class ExpedientesComponent implements OnInit {
  public searchTerm: string = '';
  public searchTerms: string = '';
  public nextPag: string = '';
  public previusPag: string = '';
  public canElementos: string = '';
  public listado_expedientes: any[] = [];
  filtered_expedientes: any[] = [];
  codeExpedient: string = '';
  menuOptionExpedients = [
    'Datos del expediente',
    'Descripción',
    'Datos del asegurado. Situación del riesgo',
    'Datos de la póliza',
    'Datos del siniestro',
    'Facturacion',
  ];
  nombresExpediente = [
    'Gestión de siniestro sector asegurador',
    'Gestión de siniestro internacional',
    'Gestión siniestro médico sector asegurador',
    'Particulares',
    'Procedimiento civil',
    'Procedimiento penal',
    'Procedimiento administrativo',
    'Asunto pericial técnico especializado',
    'Tasación',
  ];
  //dfd

  public listado_empresas: any[] = [];

  isModalOpen = false;
  option = 0;

  formGroup!: FormGroup;
  activeStep = 0;
  allInputs = [
    { id: 'file_id', label: 'File ID' },
    { id: 'code', label: 'Code' },
    { id: 'start_date', label: 'Start Date' },
    { id: 'end_date', label: 'End Date' },
    { id: 'assignment', label: 'Assignment' },
    { id: 'description', label: 'Description' },
    { id: 'type', label: 'Type' },
    { id: 'created_by', label: 'Created By' },
    { id: 'status', label: 'Status' },
    { id: 'billing_issuer', label: 'Billing Issuer' },
    { id: 'attributes', label: 'Attributes' },
  ];

  initialFileDetails: FileDetails = {
    file_id: 0,
    code: '',
    start_date: '',
    end_date: [],
    assignment: '',
    description: '',
    type: '',
    created_by: 0,
    modified_by: [],
    status: '',
    billing_issuer: '',
    insured_details: [],
    policy_details: [],
    current_address: [],
    community_details: [],
    accident_details: [],
    mediator_details: [],
    attributes: [],
  };
  activeTab = 0;
  openTab = 1;
  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
  }

  constructor(public service: DataService, private fb: FormBuilder) {
    this.getListCompany();
  }

  ngOnInit(): void {
    this.getExpedientes();
    const group: any = {};
    this.allInputs.forEach((input) => {
      group[input.id] = [
        this.initialFileDetails[input.id as keyof FileDetails],
        Validators.required,
      ];
    });
    this.formGroup = this.fb.group({});
  }

  onSubmit() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  getExpedientes() {
    this.service.getExpedients('incident_files/').subscribe(
      (response) => {
        console.log(response);
        this.listado_expedientes = response.results;
        this.filtered_expedientes = response.results;
        console.log(this.listado_expedientes);
      },
      (error) => {
        this.isModalOpen = true;
        console.error('Error al traer listado de expedientes', error);
        // Manejar el error en el login
      }
    );
  }

  confirm() {
    window.location.reload();
  }

  onSearch(): void {
    if (this.searchTerm) {
      this.service
        .getData(`incident_files/?search=${this.searchTerm}`)
        .subscribe(
          (response) => {
            console.log(response);
            this.listado_expedientes = response.results;
            this.filtered_expedientes = response.results;
            this.nextPag = response.next;
            this.previusPag = response.previous;
            if (response.count <= 10) {
              if (response.count == 0) {
                this.canElementos = '0';
              } else {
                this.canElementos = '1';
              }
            } else {
              this.canElementos = (response.count / 10).toFixed(0);
            }
            console.log(this.listado_expedientes);
          },
          (error) => {
            console.error('Error al traer listado de empresas:', error);
            // Manejar el error en el login
          }
        );
    }
    // console.log(this.searchTerm)
    // this.filtered_empresas = this.listado_empresas.filter((empresa: any) => {
    //   // Verificar que los campos sean strings válidos antes de llamar a toLowerCase()
    //   const nombre = empresa.nombre ? empresa.nombre : '';
    //   const email = empresa.email ? empresa.email : '';
    //   const telefono = empresa.telefono ? empresa.telefono : '';
    //   return nombre.includes(this.searchTerm) ||
    //          email.includes(this.searchTerm) ||
    //          telefono.includes(this.searchTerm);
    // });
  }

  nextPage() {
    if (this.nextPag != null) {
      const url = this.nextPag;
      const queryString = url.split('?')[1];
      console.log(queryString);
      this.service.getData('incident_files/?' + queryString).subscribe(
        (response) => {
          console.log(response);
          this.listado_expedientes = response.results;
          this.filtered_expedientes = response.results;
          this.nextPag = response.next;
          this.previusPag = response.previous;
          if (response.count <= 10) {
            if (response.count == 0) {
              this.canElementos = '0';
            } else {
              this.canElementos = '1';
            }
          } else {
            this.canElementos = (response.count / 10).toFixed(0);
          }
          console.log(this.listado_expedientes);
        },
        (error) => {
          console.error('Error al traer listado de empresas:', error);
          // Manejar el error en el login
        }
      );
    }
  }
  previusPage() {
    if (this.previusPag != null) {
      const url = this.previusPag;
      const queryString = url.split('?')[1];
      console.log(queryString);
      this.service.getData('incident_files/?' + queryString).subscribe(
        (response) => {
          console.log(response);
          this.listado_expedientes = response.results;
          this.filtered_expedientes = response.results;
          this.nextPag = response.next;
          this.previusPag = response.previous;
          if (response.count <= 10) {
            if (response.count == 0) {
              this.canElementos = '0';
            } else {
              this.canElementos = '1';
            }
          } else {
            this.canElementos = (response.count / 10).toFixed(0);
          }
          console.log(this.listado_expedientes);
        },
        (error) => {
          console.error('Error al traer listado de empresas:', error);
          // Manejar el error en el login
        }
      );
    }
  }

  changeVisibility(value: number): void {
    this.option = value;
    // this.service.setOptionChange(this.option)
    // if (this.option != 1 && this.option != 3 ) {

    //   this.service.setChange(true)
    // }else{

    //   this.service.setChange(false)
    // }
    console.log('El valor actual de option es: ' + this.option);

    // if (this.option == 3 || this.option ==1) {
    //   this.service.setChange(false)
    // }
  }

  getListCompany() {
    this.service.getData('enterprises/').subscribe(
      (response) => {
        console.log(response);
        this.listado_empresas = response.results;
        console.log(this.listado_empresas);
      },
      (error) => {
        console.error('Error al traer listado de empresas:', error);
        // Manejar el error en el login
      }
    );
  }

  getExpedientParticular(id: string) {
    console.log("Get Particular: "+ id)
    this.service.getEnterprise('incident_files/' + id + '/').subscribe(
      (response) => {
        console.log(response);
        this.initialFileDetails = response.results;
      },
      (error) => {
        console.error('Error al traer listado de empresas:', error);
        // Manejar el error en el login
      }
    );
  }

  createExpedient() {
    let expediente = {
      assignment: this.initialFileDetails.assignment,
      description: this.initialFileDetails.description,
      type: this.initialFileDetails.type,
      status: 'created',
    };

    console.log(expediente);
    if (!expediente.assignment || !expediente.description || !expediente.type) {
      console.log('Por favor, complete todos los campos', '', {
        duration: 2000,
      });
    } else {
      this.service.postData('incident_files/', expediente).subscribe(
        (response) => {
          if (response) console.log('Registro creado correctamente', response);
          console.log('Registro creado correctamente', '', {
            duration: 2000,
          });
          this.option = 0;
        },
        (error) => {
          console.error('El expediente no se pudo crear:', error);
          // Manejar el error en el login
          console.log('El expediente no se pudo crear', '', {
            duration: 2000,
          });
        }
      );
    }
  }

  openExpedient(code: string, id: string) {
    this.getExpedientParticular(id);
    this.codeExpedient = code;
    this.option = 2;
  }

  setActiveTab(index: number) {
    this.activeTab = index;
  }

  filteredNombresExpediente = [...this.nombresExpediente];
  filterOptions() {
    this.filteredNombresExpediente = this.nombresExpediente.filter((nombre) =>
      nombre.toLowerCase().includes(this.searchTerms.toLowerCase())
    );
  }

  selectOption(nombre: string) {
    this.initialFileDetails.type = nombre;
    this.searchTerms = nombre;
    this.filteredNombresExpediente = [];
  }
}
