import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';
import { UserTypeEnum } from '../enum/user.enum';
import { map, take } from 'rxjs';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  const userFacade = inject(UserFacade);
  const router = inject(Router);

  const expectedRoles: UserTypeEnum[] = route.data['roles'];

  return userFacade.user$.pipe(
    take(1),
    map((user) => {
      const hasRole = expectedRoles.some((role) => user?.userType === role);
      return hasRole || router.parseUrl('/login');
    })
  );
};
