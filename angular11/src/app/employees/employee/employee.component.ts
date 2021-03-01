import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from '../../models/employee.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  form: FormGroup;
  employee: Employee;

  constructor(private service: EmployeeService, private _fb: FormBuilder, private toastr: ToastrService)
  {
    this.form = this._fb.group({
      employeeId: 0,
      fullName: ['', [Validators.required]],
      empCode: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      position: ['', [Validators.required]]
    });
    this.employee = new Employee(0, '', '', '', '');
  }

  ngOnInit() {
    this.form.reset();
  }

  insertRecord() {
    this.employee.FullName = this.form.get('fullName')?.value;
    this.employee.Position = this.form.get('position')?.value;
    this.employee.EMPCode = this.form.get('empCode')?.value;
    this.employee.Mobile = this.form.get('mobile')?.value;

    this.service.postEmployee(this.employee).subscribe((res: any) => {
      this.showSuccess();
      this.form.reset();
      this.service.refreshList();
    });
  }

  updateRecord() {
    this.employee.EmployeeID = this.form.get('employeeId')?.value;
    this.employee.FullName = this.form.get('fullName')?.value;
    this.employee.Position = this.form.get('position')?.value;
    this.employee.EMPCode = this.form.get('empCode')?.value;
    this.employee.Mobile = this.form.get('mobile')?.value;

    this.service.putEmployee(this.employee).subscribe(res => {
      this.showInfo();
      this.form.reset();
      this.service.refreshList();
    });
  }

  onSubmit() {
    if (this.form.value.employeeId == null) {
      this.insertRecord();
    }
    else {
      this.updateRecord();
    }
  }

  showSuccess() {
    this.toastr.success('El empleado fue registrado con exito!', 'Empleado Registrado!');
  }

  showInfo() {
    this.toastr.info('El empleado fue actualizado con exito!', 'Empleado Actualizado!');
  }
}
