import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { HomeComponent } from '../pages/home/home.component';
import { AlumnosComponent } from '../pages/alumnos/alumnos.component';
import { HttpClientModule } from '@angular/common/http';
import { NotasComponent } from '../pages/notas/notas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, HomeComponent, AlumnosComponent, HttpClientModule, NotasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'APPalumnosAngular';
}
