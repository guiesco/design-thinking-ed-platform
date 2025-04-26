import { createReducer, on } from '@ngrx/store';
import { initialConclusionState } from './conclusion.state';
import * as ConclusionActions from './conclusion.actions';

export const conclusionFeatureKey = 'conclusion';

export const conclusionReducer = createReducer(
  initialConclusionState,

  // Create Conclusion
  on(ConclusionActions.createConclusion, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ConclusionActions.createConclusionSuccess, (state, { conclusion }) => ({
    ...state,
    conclusion,
    loading: false,
  })),
  on(ConclusionActions.createConclusionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Get Conclusion by Project
  on(ConclusionActions.getConclusionByProject, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    ConclusionActions.getConclusionByProjectSuccess,
    (state, { conclusion }) => ({
      ...state,
      conclusion,
      loading: false,
    })
  ),
  on(ConclusionActions.getConclusionByProjectFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(ConclusionActions.getConclusionByProjectEmpty, (state) => ({
    ...state,
    conclusion: null,
    loading: false,
  })),

  // Update Conclusion
  on(ConclusionActions.updateConclusion, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ConclusionActions.updateConclusionSuccess, (state, { conclusion }) => ({
    ...state,
    conclusion,
    loading: false,
  })),
  on(ConclusionActions.updateConclusionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // File Operations
  on(ConclusionActions.loadFiles, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ConclusionActions.loadFilesSuccess, (state, { files }) => ({
    ...state,
    files,
    loading: false,
  })),
  on(ConclusionActions.loadFilesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(ConclusionActions.uploadFile, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ConclusionActions.uploadFileSuccess, (state, { file }) => {
    if (!file || file === null || !file.id) {
      return {
        ...state,
        loading: false,
      };
    }

    const fileExists = state.files.some(
      (existingFile) => existingFile.id === file.id
    );

    return {
      ...state,
      files: fileExists ? state.files : [...state.files, file],
      loading: false,
    };
  }),

  on(ConclusionActions.uploadFileFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(ConclusionActions.deleteFile, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ConclusionActions.deleteFileSuccess, (state, { fileId }) => ({
    ...state,
    files: state.files.filter((file) => file.id !== fileId),
    loading: false,
  })),
  on(ConclusionActions.deleteFileFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
