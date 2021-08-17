import {
  SET_EXPENSE,
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
} from "../actions/expense";

const initialState = {
  data: [],
};

const expense = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXPENSE:
      return {
        ...state,
        data: action.payload,
      };

    case ADD_EXPENSE:
      state.data.push(action.payload);
      return {
        ...state,
        data: [...state.data],
      };

    case UPDATE_EXPENSE:
      const updateIndex = state.data.findIndex(
        (item) => item._id === action.payload.id
      );
      state.data.splice(updateIndex, 1, action.payload.data);
      return {
        ...state,
        data: [...state.data],
      };
    case DELETE_EXPENSE:
      const delIndex = state.data.findIndex(
        (item) => item._id === action.payload.id
      );
      state.data.splice(delIndex, 1);
      return {
        ...state,
        data: [...state.data],
      };
    default:
      return state;
  }
};

export default expense;
