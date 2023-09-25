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

  likePublication(publicationId: string, userId: string): Observable<any> {
    const requestBody = { userId: userId };
    return this.http.post(`${this.apiUrl}publictpacto/${publicationId}/like`, requestBody);
  }


  unlikePublication(publicationId: string, userId: string): Observable<any> {
    const requestBody = { userId: userId };
    return this.http.delete(`${this.apiUrl}publictpacto/${publicationId}/unlike`, { body: requestBody });
  }

  commentPublication(publicationId: string, comment: string): Observable<any> {
    return this.http.post(`${this.apiUrl}comments/create/${publicationId}`, { comment })

  }

  getLikedPublications(userId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}publictpacto/users/${userId}/likes`);
  }

}
