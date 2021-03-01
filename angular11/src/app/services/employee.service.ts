import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  myAppUrl = 'https://localhost:44385/';
  myApiUrl = 'api/Employee/';
  list : Employee[];
  private actualizarFormulario = new BehaviorSubject<Employee>({} as any);

  constructor(private http : HttpClient) {
    this.list = [];
  }

  postEmployee(employee : Employee) {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, employee);
  }

  refreshList() {
    this.http.get(`${this.myAppUrl}${this.myApiUrl}`)
    .toPromise().then(res => this.list = res as Employee[]);
  }

  getEmployee$(): Observable<Employee> {
    return this.actualizarFormulario.asObservable();
  }

  putEmployee(employee : Employee) {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${employee.EmployeeID}`, employee);
  }

  update(employee : Employee) {
    this.actualizarFormulario.next(employee);
  }

  deleteEmployee(id : number) {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
}
