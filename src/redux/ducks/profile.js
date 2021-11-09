export const SET_ID = "kode/PROFILE/SET_ID";

export const setId = (payload) => ({
  type: SET_ID,
  payload: payload,
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

    default:
      return state;
  }
}

export const setSelectedItemId = (id) => {
  return (dispatch) => {
    dispatch(setId(id));
  };
};
