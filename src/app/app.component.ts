import { Component } from '@angular/core';

import {
  Employee,
  EmployeeLoaderService
} from './employee-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  employees: Employee[] = [];

  constructor(svc: EmployeeLoaderService) {
    svc
      .loadEmployees()
      .subscribe(
        (employeeList: Employee[]) => (this.employees = employeeList)
      );
  }
}
