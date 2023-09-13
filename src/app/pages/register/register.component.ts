import { Component } from '@angular/core';
import { ApiService } from '../../core/services/formulario/api.service';
import { capitales } from '../../core/services/formulario/capitales';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] 
})
export class RegisterComponent {
  capitalesdata = capitales;
  departamentosUnicos: string[] = [];
  municipiosUnicos: string[] = [];


  constructor(private apiservice: ApiService) { }

  ngOnInit(): void {
    // Lógica para obtener listas de departamentos y municipios únicos
    this.departamentosUnicos = this.obtenerDepartamentosUnicos();
    this.municipiosUnicos = this.obtenerMunicipiosUnicos();
  }

  private obtenerDepartamentosUnicos(): string[] {
    const departamentos: string[] = this.capitalesdata.map(capital => capital.departamento);
    return departamentos.filter((departamento, index, self) => self.indexOf(departamento) === index);
  }

  private obtenerMunicipiosUnicos(): string[] {
    const municipios: string[] = this.capitalesdata.map(capital => capital.municipio);
    return municipios.filter((municipio, index, self) => self.indexOf(municipio) === index);
  }
}
