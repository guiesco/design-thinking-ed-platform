import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { IdeationFacade } from './ideation.facade';
import { IdeationService } from './ideation.service';
import { ideationReducer } from './ideation.reducer';
import { IdeationEffects } from './ideation.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('ideation', ideationReducer),
    EffectsModule.forFeature([IdeationEffects]),
  ],
  providers: [IdeationFacade, IdeationService],
})
export class IdeationStateModule {}
