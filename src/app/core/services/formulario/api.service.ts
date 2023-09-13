import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { asyncData } from 'src/assets/testing/async-observable-helpers.config';
import { capitales } from './capitales';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) { }

  getforms() {
    return asyncData(capitales)

  }
}
