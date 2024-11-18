import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserFacade } from './user.facade';
import { userReducer } from './user.reducer';
import { UserEffects } from './user.effects';
import { UserService } from './user.service';

@NgModule({
  imports: [
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: [UserFacade, UserService],
})
export class UserStateModule {}
