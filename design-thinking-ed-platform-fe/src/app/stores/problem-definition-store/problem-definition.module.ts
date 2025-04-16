import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProblemDefinitionEffects } from './problem-definition.effects';
import { problemDefinitionReducer } from './problem-definition.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('problemDefinition', problemDefinitionReducer),
    EffectsModule.forFeature([ProblemDefinitionEffects]),
  ],
})
export class ProblemDefinitionStoreModule {}
