
// import { types } from "../types/types";
// import store from "../../store";

// export const actions = {

//     setGridData(id,newData) {
//         return {
//           type: types.SET_GRID_DATA,
//           payload: { id,newData },
//         };
//       },
    
//       saveGridSortModel(id, sortModel) {
//         return {
//           type: types.SAVE_GRID_SORT_MODEL,
//           payload: { id, sortModel },
//         };
//       },
//       saveGridFilterModel(id, filterModel) {
//         return {
//           type: types.SAVE_GRID_FILTER_MODEL,
//           payload: { id, filterModel },
//         };
//       },
    
//       saveGridColumnState(id, columnState) {
//         return {
//           type: types.SAVE_GRID_COLUMN_STATE,
//           payload: { id, columnState },
//         };
//       },
    
//       saveGridColumnGroupState(id, columnGroupState) {
//         return {
//           type: types.SAVE_GRID_COLUMN_GROUP_STATE,
//           payload: { id, columnGroupState },
//         };
//       },
    
//       saveGridPivotModeState(id, isPivotMode) {
//         return {
//           type: types.SAVE_GRID_PIVOT_MODE_STATE,
//           payload: { id, isPivotfunction},
//          };
//          },
//           saveGridSortModel(state, { gridId, sortModel }) {
//             return produce(state, (draftState) => {
//               let grid = getGridById(draftState, gridId);
          
//               grid.sortModel = sortModel;
//             });
//           },
          
//           saveGridFilterModel(state, { gridId, filterModel }) {
//             return produce(state, (draftState) => {
//               let grid = getGridById(draftState, gridId);
          
//               grid.filterModel = filterModel;
//             });
//           },
          
//           saveGridColumnState(state, { gridId, columnState }) {
//             return produce(state, (draftState) => {
//               let grid = getGridById(draftState, gridId);
//               if (grid) {
//                 grid.columnState = columnState;
//               }
//             });
//           },
          
//           saveGridColumnGroupState(state, { gridId, columnGroupState }) {
//             return produce(state, (draftState) => {
//               let grid = getGridById(draftState, gridId);
//               if (grid) {
//                 grid.columnGroupState = columnGroupState;
//               }
//             });
//           },
//           saveGridPivotModeState(gridId, isPivotMode) {
//             return {
//               type: types.SAVE_GRID_PIVOT_MODE_STATE,
//               payload: { gridId, isPivotMode },
//             };
//           },
          
         

// }