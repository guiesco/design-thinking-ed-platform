import {
  EmpathyMapEntry,
  EmpathyMapResponse,
} from '../../common/interfaces/empathy-map.interface';

export interface EmpathyMapState {
  entries: EmpathyMapEntry[];
  responses: EmpathyMapResponse[];
  empathyMap: any | null;
  loading: boolean;
  error: any;
}

export const initialState: EmpathyMapState = {
  entries: [],
  responses: [],
  empathyMap: null,
  loading: false,
  error: null,
};
