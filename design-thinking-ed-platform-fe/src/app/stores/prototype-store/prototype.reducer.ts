import { createReducer, on } from '@ngrx/store';
import { initialPrototypeState } from './prototype.state';
import * as PrototypeActions from './prototype.actions';

export const prototypeReducer = createReducer(
  initialPrototypeState,

  // Criar Protótipo
  on(PrototypeActions.createPrototype, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(PrototypeActions.createPrototypeSuccess, (state, { prototype }) => ({
    ...state,
    prototype,
    loading: false,
  })),

  on(PrototypeActions.createPrototypeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Obter Protótipo por Projeto
  on(PrototypeActions.getPrototypeByProject, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(PrototypeActions.getPrototypeByProjectSuccess, (state, { prototype }) => ({
    ...state,
    prototype,
    loading: false,
  })),

  on(PrototypeActions.getPrototypeByProjectFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(PrototypeActions.getPrototypeByProjectEmpty, (state) => ({
    ...state,
    prototype: null,
    loading: false,
  })),

  // Atualizar Protótipo
  on(PrototypeActions.updatePrototype, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(PrototypeActions.updatePrototypeSuccess, (state, { prototype }) => ({
    ...state,
    prototype,
    loading: false,
  })),

  on(PrototypeActions.updatePrototypeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Finalizar Protótipo
  on(PrototypeActions.finalizePrototype, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(PrototypeActions.finalizePrototypeSuccess, (state, { prototype }) => ({
    ...state,
    prototype,
    loading: false,
  })),

  on(PrototypeActions.finalizePrototypeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Carregar Arquivos
  on(PrototypeActions.loadFiles, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(PrototypeActions.loadFilesSuccess, (state, { files }) => ({
    ...state,
    files,
    loading: false,
  })),

  on(PrototypeActions.loadFilesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Upload de Arquivo
  on(PrototypeActions.uploadFile, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(PrototypeActions.uploadFileSuccess, (state, { file }) => {
    // Verificar se o arquivo é válido antes de adicioná-lo ao estado
    if (!file || file === null || !file.id) {
      return {
        ...state,
        loading: false,
      };
    }

    // Verificar se o arquivo já existe no estado para evitar duplicatas
    const fileExists = state.files.some(
      (existingFile) => existingFile.id === file.id
    );

    return {
      ...state,
      files: fileExists ? state.files : [...state.files, file],
      loading: false,
    };
  }),

  on(PrototypeActions.uploadFileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Remover Arquivo
  on(PrototypeActions.deleteFile, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(PrototypeActions.deleteFileSuccess, (state, { fileId }) => ({
    ...state,
    files: state.files.filter((file) => file.id !== fileId),
    loading: false,
  })),

  on(PrototypeActions.deleteFileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
