import { Component, OnInit } from '@angular/core';
import { UsersManagementService } from '../../services/users-management.service';

@Component({
  selector: 'app-gestion-veterinarios',
  templateUrl: './gestion-veterinarios.component.html',
  styleUrls: ['./gestion-veterinarios.component.scss']
})
export class GestionVeterinariosComponent implements OnInit {
  citas: any[] = [];
  isModalOpen = false; // Variable para controlar el estado del modal

  constructor(private usersManagementService: UsersManagementService) {}

  ngOnInit(): void {
    this.usersManagementService.getVeterinarios().subscribe(res => {
      this.citas = res.map(cita => ({
        IdVeterinario: cita.IdVeterinario,
        nombreVeterinario: cita.nombreVeterinario,
        estadoVet: cita.estadoVet || 'No especificado'
      }));
    }, error => {
      console.error('Error fetching data:', error);
    });
  }

  toggleStatus(id: string, currentStatus: string): void {
    const newStatus = currentStatus === 'Activo' ? 'Inactivo' : 'Activo';
    this.usersManagementService.changeVeterinaryStatus(id, newStatus).subscribe(
      () => {
        this.citas = this.citas.map(cita => cita.IdVeterinario === id ? { ...cita, estadoVet: newStatus } : cita);
      },
      error => {
        console.error('Error updating status:', error);
      }
    );
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
