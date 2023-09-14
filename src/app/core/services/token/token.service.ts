import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private authService: AuthService) { }

  intercept(req:any, next:any) {
    const tokennzeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.gettoken()}`
      }
    })
    return next.handle(tokennzeReq)

  }
}
