import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClass } from 'src/app/common/interfaces/class.interface';

@Injectable()
export class ClassService {
  api = 'http://localhost:3000';
  constructor(private readonly http: HttpClient) {}
}
