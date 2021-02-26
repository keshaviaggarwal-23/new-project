import { types } from "../types/index"

export const setGridData=(set_grid_data)=> {
    return {
      type: types.SET_GRID_DATA,
      set_grid_data
    //   payload: { id,newData },
    };
  },
