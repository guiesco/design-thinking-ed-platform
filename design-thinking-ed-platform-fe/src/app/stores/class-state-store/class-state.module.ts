import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { classReducer } from './class.reducer';
import { ClassEffects } from './class.effects';
import { ClassService } from './class.service';
import { ClassFacade } from './class.facade';

@NgModule({
  imports: [
    StoreModule.forFeature('class', classReducer),
    EffectsModule.forFeature([ClassEffects]),
  ],
  providers: [ClassFacade, ClassService],
})
export class ClassStateModule {}
