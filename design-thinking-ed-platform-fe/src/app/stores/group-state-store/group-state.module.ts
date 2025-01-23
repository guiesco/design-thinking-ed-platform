import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { GroupFacade } from './group.facade';
import { groupReducer } from './group.reducer';
import { GroupEffects } from './group.effects';
import { GroupService } from './group.service';

@NgModule({
  imports: [
    StoreModule.forFeature('group', groupReducer),
    EffectsModule.forFeature([GroupEffects]),
  ],
  providers: [GroupFacade, GroupService],
})
export class GroupStateModule {}
