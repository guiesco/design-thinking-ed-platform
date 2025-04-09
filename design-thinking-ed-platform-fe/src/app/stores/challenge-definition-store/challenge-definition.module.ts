import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { challengeDefinitionReducer } from './challenge-definition.reducer';
import { ChallengeDefinitionEffects } from './challenge-definition.effects';
import { ChallengeDefinitionFacade } from './challenge-definition.facade';
import { ChallengeDefinitionService } from './challenge-definition.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('challengeDefinition', challengeDefinitionReducer),
    EffectsModule.forFeature([ChallengeDefinitionEffects]),
  ],
  providers: [ChallengeDefinitionFacade, ChallengeDefinitionService],
})
export class ChallengeDefinitionModule {}
