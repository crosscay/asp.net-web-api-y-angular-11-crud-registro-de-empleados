import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from '../../models/employee.model'
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  form: FormGroup;

  constructor(private service: EmployeeService, private _fb: FormBuilder, private toastr: ToastrService)
  {
    this.form = this._fb.group({
      employeeId: 0,
      fullName: ['', [Validators.required, Validators.maxLength(50)]],
      empCode: ['', [Validators.required, Validators.maxLength(20)]],
      mobile: ['', [Validators.required, Validators.maxLength(20)]],
      position: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit() {
    this.form.reset();
  }

  insertRecord() {
    this.service.postEmployee(this.form.value).subscribe(res => {
      this.showSuccess();
      this.form.reset();
      this.service.refreshList();
    });
  }

  updateRecord() {
    this.service.putEmployee(this.form.value).subscribe(res => {
      this.showInfo();
      this.form.reset();
      this.service.refreshList();
    });
  }

  onSubmit(form: any) {
    console.log(this.form.value.employeeId);
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
