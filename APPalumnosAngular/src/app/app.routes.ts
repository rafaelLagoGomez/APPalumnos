import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { AlumnosComponent } from '../pages/alumnos/alumnos.component';
import { NotasComponent } from '../pages/notas/notas.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'alumnos', component: AlumnosComponent},
    {path: 'notas', component: NotasComponent}
];
