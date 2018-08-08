import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'https://api.angularbootcamp.com';

export interface Employee {
  first_name: string;
  last_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeLoaderService {

  constructor(private http: HttpClient) { }

  loadEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(API_URL + '/employees')
      .pipe(map(employees => employees.slice(0, 5)));
  }
}
