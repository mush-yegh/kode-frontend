import axios from "axios";
import { API_URL } from "../../config";
import { prepareWorkersList } from "../../util";

export const WORKERS_LIST_REQUEST = "kode/workers/WORKERS_LIST_REQUEST";
export const WORKERS_LIST_RESPONSE = "kode/workers/WORKERS_LIST_RESPONSE";
export const WORKERS_LIST_ERROR = "kode/workers/WORKERS_LIST_ERROR";

export const workersList = () => ({
  type: WORKERS_LIST_REQUEST,
});

export const workersListFulfilled = (payload) => ({
  type: WORKERS_LIST_RESPONSE,
  payload,
});

export const workersListFailed = (payload) => ({
  type: WORKERS_LIST_ERROR,
  payload: payload,
});

const initialState = {
  workersList: null,
  isLoading: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case WORKERS_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case WORKERS_LIST_RESPONSE:
      return {
        ...state,
        workersList: prepareWorkersList(action.payload),
        isLoading: false,
        error: null,
      };
    case WORKERS_LIST_ERROR:
      return {
        ...state,
        workersList: null,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export const fetchWorkersList = () => {
  return (dispatch) => {
    dispatch(workersList());

    const options = {
      method: "GET",
      url: `${API_URL}/users`,
      headers: {
        "Content-Type": "application/json",
        Prefer: "code=200, dynamic=true",
        // Prefer: "code=500, dynamic=true",
      },
    };

    axios
      .request(options)
      .then(({ data }) => {
        dispatch(workersListFulfilled(data.items));
      })
      .catch((error) => {
        dispatch(workersListFailed(error));
      });
  };
};
