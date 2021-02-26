import { types } from "../types/types"

import { produce } from "immer"; 

export default function reducer(state = {}, action) {
  const payload = action.payload;
  switch (action.type) {
  

    case types.SET_GRID_DATA:
      return setGridData(state, payload);

    case types.SAVE_GRID_SORT_MODEL:
      return saveGridSortModel(state, payload);

    case types.SAVE_GRID_FILTER_MODEL:
      return saveGridFilterModel(state, payload);

    case types.SAVE_GRID_COLUMN_STATE:
      return saveGridColumnState(state, payload);

    case types.SAVE_GRID_COLUMN_GROUP_STATE:
      return saveGridColumnGroupState(state, payload);

    case types.SAVE_GRID_PIVOT_MODE_STATE:
      
    return saveGridPivotModeState(state, payload);
      default:
        return state;
    }

    function saveGridSortModel(state, { gridId, sortModel }) {
        return produce(state, (draftState) => {
          let grid = getGridById(draftState, gridId);
      
          grid.sortModel = sortModel;
        });
      }
      
      function saveGridFilterModel(state, { gridId, filterModel }) {
        return produce(state, (draftState) => {
          let grid = getGridById(draftState, gridId);
      
          grid.filterModel = filterModel;
        });
      }
      
      function saveGridColumnState(state, { gridId, columnState }) {
        return produce(state, (draftState) => {
          let grid = getGridById(draftState, gridId);
          if (grid) {
            grid.columnState = columnState;
          }
        });
      }
      
      function saveGridColumnGroupState(state, { gridId, columnGroupState }) {
        return produce(state, (draftState) => {
          let grid = getGridById(draftState, gridId);
          if (grid) {
            grid.columnGroupState = columnGroupState;
          }
        });
      }
      
      function saveGridPivotModeState(state, {isPivotMode }) {
        return produce(state, (draftState) => {
          let grid = getGridById(draftState);
          grid.isPivotMode = isPivotMode;
        });
      }
  


}