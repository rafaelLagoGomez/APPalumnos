import { Component } from '@angular/core';
import { AlumnosService } from '../../app/services/alumnos.service';
import { Student } from '../../app/models/student';
import { CardStudentsComponent } from '../../components/card-students/card-students.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CardStudentsComponent],
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.css'
})

export class AlumnosComponent {

  public students: Student [] = [];
  public textWarning: string = "";
    
  constructor (private readonly alumnosService: AlumnosService, private readonly router: Router) {
    this.alumnosService.getAllStudentsApi().subscribe((data: Student[] ) => {
      console.log(data);
      this.students = data;
    })
  }


  public findStudent(inputId: HTMLInputElement) {
    if(inputId.value === "") {
      this.alumnosService.getAllStudentsApi().subscribe((data: Student[]) => {
        console.log(data);
        this.students = data;
        this.textWarning = "";
      })
    } else { 
      this.alumnosService.getByIdStudentApi(Number(inputId.value)).subscribe((data: Student[]) => {
        console.log(data);
        this.students = data;
        this.textWarning = "";
        inputId.value = "";
      })
      this.students = [];
      this.textWarning = "Vaya! Ese ID no existe."
    } 
  }


  public addNewStudent(inputId: HTMLInputElement, inputNombre: HTMLInputElement, inputApellido: HTMLInputElement, inputGrupo: HTMLInputElement, inputYearMatricula: HTMLInputElement) {
    const newStudent: Student = {
      student_id: parseFloat(inputId.value),
      first_name: inputNombre.value,
      last_name: inputApellido.value,
      group_id: parseFloat(inputGrupo.value),
      year_income: parseFloat(inputYearMatricula.value),
    }
    this.alumnosService.addNewStudentApi(newStudent).subscribe((data: Student[]) => {
      console.log(data);
      this.alumnosService.getAllStudentsApi().subscribe((data: Student[]) => {
        console.log(data);
        this.students = data;
        inputId.value = "";
        inputNombre.value = "";
        inputApellido.value = "";
        inputGrupo.value = "";
        inputYearMatricula.value = "";
      })
      this.textWarning = "Alumno creado correctamente"
    })
  }


  public updateStudent(inputId: HTMLInputElement, inputNombre: HTMLInputElement, inputApellido: HTMLInputElement, inputGrupo: HTMLInputElement, inputYearMatricula: HTMLInputElement) {
    const updateStudent: Student = {
      student_id: parseFloat(inputId.value),
      first_name: inputNombre.value,
      last_name: inputApellido.value,
      group_id: parseFloat(inputGrupo.value),
      year_income: parseFloat(inputYearMatricula.value),
    }
    this.alumnosService.updateStudentApi(updateStudent).subscribe((data) => {
      console.log(data);
      this.alumnosService.getByIdStudentApi(Number(inputId.value)).subscribe((data: Student[]) => {
        console.log(data);
        this.students = data;
        inputId.value = "";
        inputNombre.value = "";
        inputApellido.value = "";
        inputGrupo.value = "";
        inputYearMatricula.value = ""; 
      })
    this.textWarning = "Alumno actualizado correctamente"    
    })
    this.students = [];
    this.textWarning = "Vaya! Ese ID no existe."
  }


  public studentToDelete(inputId: HTMLInputElement) {
    this.alumnosService.deleteStudentApi(Number(inputId.value)).subscribe((data: Student[]) => {
      console.log(data);
      this.alumnosService.getAllStudentsApi().subscribe((data: Student[]) => {
        console.log(data);
        this.students = data;
      })
    this.textWarning = "Alumno eliminado correctamente"
    inputId.value = "";
    })
    this.students = [];
    this.textWarning = "Vaya! Ese ID no existe."
  }

}
