import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { conclusionReducer, conclusionFeatureKey } from './conclusion.reducer';
import { ConclusionEffects } from './conclusion.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(conclusionFeatureKey, conclusionReducer),
    EffectsModule.forFeature([ConclusionEffects]),
  ],
})
export class ConclusionStoreModule {}
