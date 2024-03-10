import { Component } from '@angular/core';
import { Mark } from '../../app/models/mark';
import { AlumnosService } from '../../app/services/alumnos.service';
import { CardSsubjComponent } from '../../components/card-ssubj/card-ssubj.component';
import { Student } from '../../app/models/student';
import { Subject } from '../../app/models/subject';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CardSsubjComponent],
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css'
})
export class NotasComponent {

  public textWarning: string = "";
  public selected: any [] = [];
  
  constructor (private readonly alumnosService: AlumnosService) {
    
  }


  public notaMediaAlumnoId(inputId: HTMLInputElement) {
    this.alumnosService.getMediaStudentByIdApi(Number(inputId.value)).subscribe((data: any) => {
      console.log(data);
      this.selected = data;
      this.textWarning = "";
      inputId.value = "";
    })
    this.selected = [];
    this.textWarning = "Vaya! Ese ID no existe.";
  }

  
  public todasAsignaturasOrByStudentId(inputId: HTMLInputElement) {
    if(inputId.value === "") {
      this.alumnosService.getAsignaturasAllStudentsApi().subscribe((data: any) => {
        console.log(data);
        this.selected = data;
        this.textWarning = "";
      })
    } else { 
      this.alumnosService.getAsignaturasByStudentIdApi(Number(inputId.value)).subscribe((data: any) => {
        console.log(data);
        this.selected = data;
        this.textWarning = "";
        inputId.value = "";
      })
      this.selected = [];
      this.textWarning = "Vaya! Ese ID no existe.";
    } 
  }



  public todasAsignaturasOrByTeacherId(inputIdTeacher: HTMLInputElement) {
    if(inputIdTeacher.value === "") {
      this.alumnosService.getAsignaturasAllTeachersApi().subscribe((data: any) => {
        console.log(data);
        this.selected = data;
        this.textWarning = "";
      })
    } else { 
      this.alumnosService.getAsignaturasByTeacherIdApi(Number(inputIdTeacher.value)).subscribe((data: any) => {
        console.log(data);
        this.selected = data;
        this.textWarning = "";
        inputIdTeacher.value = "";
      })
      this.selected = [];
      this.textWarning = "Vaya! Ese ID no existe.";
    } 
  }

}
