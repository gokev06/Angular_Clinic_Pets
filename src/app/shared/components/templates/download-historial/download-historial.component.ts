import { Component, OnInit, Input } from '@angular/core';
import { AppointmentService } from '../../../../features/citas/services/appointment.service';
import PDFDocument from 'pdfkit';
import blobStream from 'blob-stream';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-download-historial',
  templateUrl: './download-historial.component.html',
  styleUrls: ['./download-historial.component.scss']
})
export class DownloadHistorialComponent implements OnInit {
  @Input() idCita: string = '';
  historial: any; // Para almacenar los datos del historial

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    if (this.idCita) {
      this.downloadHistorial(this.idCita);
    }
  }

  downloadHistorial(idCita: string): void {
    this.appointmentService.downloadHistorial(idCita).subscribe(
      response => {
        this.historial = response;
        this.generatePDF();
      },
      error => {
        console.error('Error al descargar el historial:', error);
      }
    );
  }

  generatePDF(): void {
    const doc = new PDFDocument();
    const stream = doc.pipe(blobStream());

    // Agregar contenido al PDF
    doc.fontSize(20).text('Historial de Cita', { align: 'center' });

    // Agregar imagen
    doc.image('src/assets/icons/logopets.png', { width: 100, align: 'center' });

    // Información del Veterinario
    doc.fontSize(16).text('Información del Veterinario');
    doc.fontSize(12).text(`Nombre: ${this.historial.nombreVeterinario}`);
    doc.text(`Título de Especialidad: ${this.historial.tituloEspecialidad}`);
    doc.text(`Especialidad: ${this.historial.especialidadMedicina}`);
    doc.text(`Teléfono: ${this.historial.telefono}`);
    doc.text(`Email: ${this.historial.email}`);

    // Información del Usuario
    doc.addPage();
    doc.fontSize(16).text('Información del Usuario');
    doc.fontSize(12).text(`Nombre: ${this.historial.nombre}`);
    doc.text(`Teléfono: ${this.historial.telefono}`);
    doc.text(`Dirección: ${this.historial.direccion}`);
    doc.text(`Email: ${this.historial.email}`);

    // Información de la Mascota
    doc.addPage();
    doc.fontSize(16).text('Información de la Mascota');
    doc.fontSize(12).text(`Nombre: ${this.historial.nombreMascota}`);
    doc.text(`Edad: ${this.historial.edadMascota}`);
    doc.text(`Especie: ${this.historial.especie}`);
    doc.text(`Raza: ${this.historial.raza}`);

    // Detalles de la Cita
    doc.addPage();
    doc.fontSize(16).text('Detalles de la Cita');
    doc.fontSize(12).text(`Motivo de Consulta: ${this.historial.motivoConsulta}`);
    doc.text(`Tratamiento: ${this.historial.tratamiento}`);
    doc.text(`Diagnóstico: ${this.historial.diagnostico}`);
    doc.text(`Examen Médico: ${this.historial.examenMedico}`);

    doc.end();

    // Guardar el PDF
    stream.on('finish', () => {
      const blob = stream.toBlob('application/pdf');
      saveAs(blob, 'historial-cita.pdf');
    });
  }
}
