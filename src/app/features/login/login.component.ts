import { Component, Renderer2, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.srvices'; // Ajusta la ruta del servicio si es necesario


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Asegúrate de que sea styleUrls en lugar de styleUrl
})
export class LoginComponent implements OnInit {

  estilos = "border-top: none; border-right: none; border-bottom: 2px solid rgb(181, 235, 246); border-left: none; border-image: initial; height: 30px; margin-top: 16px; padding: 0px 8px; width: 200px; margin-bottom: 20px;";

  constructor(private renderer: Renderer2, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadGoogleScript();
  }

  loadGoogleScript() {
    const script = this.renderer.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Lógica adicional si es necesario después de cargar el script
    };
    this.renderer.appendChild(document.body, script);
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso con Google:', response);
        // Maneja la respuesta o redirige a otra página después del inicio de sesión exitoso
      },
      (error) => {
        console.error('Error al iniciar sesión con Google:', error);
        // Maneja el error si es necesario
      }
    );
  }
}