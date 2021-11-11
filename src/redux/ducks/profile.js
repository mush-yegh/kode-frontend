const SET_ID = "kode/PROFILE/SET_ID";
const RESET_ID = "kode/WORKERS/RESET_ID";

const setId = (payload) => ({
  type: SET_ID,
  payload: payload,
});

const resetId = () => ({
  type: RESET_ID,
});

const initialState = {
  id: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ID:
      return {
        ...state,
        id: action.payload,
      };
    case RESET_ID:
      return {
        ...state,
        id: null,
      };

    default:
      return state;
  }
}

export const setSelectedItemId = (id) => {
  return (dispatch) => {
    dispatch(setId(id));
  };
};

export const resetSelectedItemId = () => {
  return (dispatch) => {
    dispatch(resetId());
  };
};
