import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private apiUrl = 'https://pooforoapi.onrender.com/'
  constructor(private http: HttpClient) { }

  likePublication(interactionId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}interactions/like/${interactionId}`, null);
  }

  unlikePublication(interactionId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}interactions/unlike/${interactionId}`,null);
  }

  commentPublication(publicationId:string):Observable<any>{
    return this.http.post(`${this.apiUrl}comments/create/${publicationId}`,{comment: String})
  }
}
