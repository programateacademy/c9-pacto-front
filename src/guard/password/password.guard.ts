// import { CanActivateFn } from '@angular/router';
// import { AuthService } from 'src/app/core/services/auth/auth.service';
// import { inject } from '@angular/core';

// export const passwordGuard: CanActivateFn = (route, state) => {
//   // Obtener el token de la URL
//   const token = route.params['token'];

//   // Validar el token
//   if (!token) {
//     return {
//       error: 'El token de cambio de contraseña no es válido.',
//     };
//   }

//   // Obtener el servicio de autenticación
//   const authService = inject(AuthService);

//   // Validar que el token sea válido para el cambio de contraseña
//   const isValidToken = authService.isValidPasswordResetToken(token);
//   if (!isValidToken) {
//     return {
//       error: 'El token de cambio de contraseña no es válido para el usuario autenticado.',
//     };
//   }

//   // Verificar que el usuario esté autenticado
//   const isLoggedIn = authService.loggedIn();
//   if (!isLoggedIn) {
//     return {
//       error: 'Debes estar autenticado para acceder a esta ruta.',
//     };
//   }

//   // Permitir que el usuario acceda a la ruta
//   return true;
// };
