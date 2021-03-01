import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from '../../models/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  form: FormGroup;
  employee: Employee;
  suscription: Subscription;
  idEmployee?: number = 0;

  constructor(private service: EmployeeService, private _fb: FormBuilder, private toastr: ToastrService)
  {
    this.form = this._fb.group({
      employeeId: 0,
      fullName: ['', [Validators.required]],
      empCode: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      position: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.suscription = this.service.getEmployee$().subscribe(data => {
      this.employee = data;
      this.form.patchValue({
        fullName: this.employee.FullName,
        empCode: this.employee.EMPCode,
        mobile: this.employee.Mobile,
        position: this.employee.Position
      });
      this.idEmployee = this.employee.EmployeeID;
    });
  }

  insertRecord() {
    this.employee.FullName = this.form.get('fullName')?.value;
    this.employee.Position = this.form.get('position')?.value;
    this.employee.EMPCode = this.form.get('empCode')?.value;
    this.employee.Mobile = this.form.get('mobile')?.value;

    const employee: Employee = {
      EmployeeID: this.employee.EmployeeID,
      FullName: this.form.get('fullName')?.value,
      Position: this.form.get('position')?.value,
      EMPCode: this.form.get('empCode')?.value,
      Mobile: this.form.get('mobile')?.value,
    }

    this.service.postEmployee(this.employee).subscribe((res: any) => {
      this.showSuccess();
      this.form.reset();
      this.service.refreshList();
    });
  }

  updateRecord() {
    const employee: Employee = {
      EmployeeID: this.employee.EmployeeID,
      FullName: this.form.get('fullName')?.value,
      Position: this.form.get('position')?.value,
      EMPCode: this.form.get('empCode')?.value,
      Mobile: this.form.get('mobile')?.value,
    }

    this.service.putEmployee(employee).subscribe(res => {
      this.showInfo();
      this.form.reset();
      this.service.refreshList();
    });
  }

  onSubmit() {
    if (this.idEmployee === null || this.idEmployee === 0 || this.idEmployee === undefined) {
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

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }
}
