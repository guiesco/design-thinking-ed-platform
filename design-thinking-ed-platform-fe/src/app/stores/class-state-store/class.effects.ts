import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './class.actions';
import { ClassService } from './class.service';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class ClassEffects {
  constructor(private readonly actions$: Actions) {}
}
