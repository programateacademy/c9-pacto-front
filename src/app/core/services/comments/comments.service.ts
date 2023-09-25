import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private apiUrl = enviroment.apiUrl
  constructor(private http: HttpClient) { }

  createComment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}comments/create`, data)
  }

  getComments(publicationId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}comments/publication/${publicationId}`);
  }

}
