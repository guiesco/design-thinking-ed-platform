import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { EmpathyMapFacade } from './empathy-map.facade';
import { EmpathyMapEffects } from './empathy-map.effects';
import { EmpathyMapService } from './empathy-map.service';
import { empathyMapReducer } from './empathy-map.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('empathyMap', empathyMapReducer),
    EffectsModule.forFeature([EmpathyMapEffects]),
  ],
  providers: [EmpathyMapFacade, EmpathyMapService],
})
export class EmpathyMapStateModule {}
