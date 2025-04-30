import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { prototypeReducer } from './prototype.reducer';
import { PrototypeEffects } from './prototype.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('prototype', prototypeReducer),
    EffectsModule.forFeature([PrototypeEffects]),
  ],
})
export class PrototypeStoreModule {}
