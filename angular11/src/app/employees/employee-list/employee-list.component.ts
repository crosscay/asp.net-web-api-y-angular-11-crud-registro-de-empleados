import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(public serviceEmployee: EmployeeService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.serviceEmployee.refreshList();
  }

  deleteEmployee(id: number){
    if (confirm('Esta seguro que desea eliminar el registro?')) {
      this.serviceEmployee.deleteEmployee(id).subscribe(data => {
        this.toastr.warning('Registro eliminado', 'El empleado fue eliminado');
        this.serviceEmployee.refreshList();
      });
    }
  }

  editEmployee(emp: Employee) {
    this.serviceEmployee.update(emp);
  }

}
