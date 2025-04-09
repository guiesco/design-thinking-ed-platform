import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { projectReducer } from './project.reducer';
import { ProjectEffects } from './project.effects';
import { ProjectFacade } from './project.facade';

@NgModule({
  imports: [
    StoreModule.forFeature('project', projectReducer),
    EffectsModule.forFeature([ProjectEffects]),
  ],
  providers: [ProjectFacade],
})
export class ProjectStateModule {}
