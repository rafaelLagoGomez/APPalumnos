import { Component, Input } from '@angular/core';
import { AlumnosComponent } from '../../pages/alumnos/alumnos.component';
import { Student } from '../../app/models/student';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-students',
  standalone: true,
  imports: [AlumnosComponent, CommonModule],
  templateUrl: './card-students.component.html',
  styleUrl: './card-students.component.css'
})

export class CardStudentsComponent {

  @Input() public students: Student = new Student();

}
