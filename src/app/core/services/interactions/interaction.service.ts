import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private apiUrl = 'https://pooforoapi.onrender.com/'
  constructor(private http: HttpClient) { }

  likePublication(publicationId: string, userId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}interactions/like/${publicationId}`, null);
  }

  unlikePublication(publicationId: string, userId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}interactions/unlike/${publicationId}`, null);
  }

  commentPublication(publicationId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}comments/create/${publicationId}`, { comment: String })
  }
}
