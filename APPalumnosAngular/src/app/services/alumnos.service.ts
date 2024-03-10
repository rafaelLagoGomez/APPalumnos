import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(private http: HttpClient) { }
  private url: string = "http://localhost:3000"


  public getAllStudentsApi(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.url}/alumnos`);
  }

  public getByIdStudentApi(student_id: number): Observable<Student[]>{
    return this.http.get<Student[]>(`${this.url}/alumnos?id=${student_id}`);
  }

  public addNewStudentApi(student: Student): Observable<Student[]> {
    return this.http.post<Student[]>(`${this.url}/alumnos`, student);
  }

  public updateStudentApi(student: Student): Observable<Student[]> {
    return this.http.put<Student[]>(`${this.url}/alumnos?id=${student.student_id}`, student);
  }

  public deleteStudentApi(student_id: number) {
    return this.http.delete<Student[]>(`${this.url}/alumnos?id=${student_id}`);
  }


  
  public getMediaStudentByIdApi(student_id: number) {
    return this.http.get(`${this.url}/media?id=${student_id}`);
  }

  public getAsignaturasAllStudentsApi() {
    return this.http.get(`${this.url}/apuntadas`);
  }

  public getAsignaturasByStudentIdApi(student_id: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.url}/apuntadas?id=${student_id}`);
  }

  public getAsignaturasAllTeachersApi() {
    return this.http.get(`${this.url}/impartidas`);
  }

  public getAsignaturasByTeacherIdApi(teacher_id: number) {
    return this.http.get(`${this.url}/impartidas?id=${teacher_id}`);
  }




}
