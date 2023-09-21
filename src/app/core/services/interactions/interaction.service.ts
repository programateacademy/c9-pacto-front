import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private apiUrl = enviroment.apiUrl
  constructor(private http: HttpClient) { }

  likePublication(interactionId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}interactions/like/${interactionId}`, null);
  }

  unlikePublication(interactionId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}interactions/unlike/${interactionId}`, null);
  }

  commentPublication(publicationId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}comments/create/${publicationId}`, { comment: String })
  }
}
