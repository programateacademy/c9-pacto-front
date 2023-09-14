import { CanActivateFn, Router } from '@angular/router';
import { Inject, inject } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';


export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const router = inject(Router)

  if(authService.loggedIn()){
    return true
  }else{
    router.navigate(['**'])
    return false
  }
};
