import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const router = inject(Router)


  if (authService.isAdmin()) {
    return true; // Permite el acceso
  } else {
    // Redirige a la página de inicio o a una página de acceso denegado
    if (state.url !== '/home' && state.url !== '/**') {
      router.navigate(['/**']);
    }
    return false;
  }
};
