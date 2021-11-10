import { axiosInstance } from "../../config";
import {
  formatDate,
  compareByFullName,
  compareByClosestBirthday,
} from "../../util";
import { DEPARTMENTS, SORT_BY } from "../../constants";

const WORKERS_REQUEST = "kode/SITE_WRAPPER/WORKERS_REQUEST";
const WORKERS_RESPONSE = "kode/HOME_SCREEN/WORKERS_RESPONSE";
const WORKERS_ERROR = "kode/HOME_SCREEN/WORKERS_ERROR";
const DEPARTMENT_UPDATE = "kode/HOME_SCREEN/DEPARTMENT_UPDATE";
const SORT_ORDER_UPDATE = "kode/HOME_SCREEN/SORT_ORDER_UPDATE";
const SEARCH_QUERY_UPDATE = "kode/HOME_SCREEN/SEARCH_QUERY_UPDATE";

const workersRequest = () => ({
  type: WORKERS_REQUEST,
});

const workersRequestFulfilled = (payload) => ({
  type: WORKERS_RESPONSE,
  payload,
});

const workersRequestFailed = (payload) => ({
  type: WORKERS_ERROR,
  payload: payload,
});
const departmentUpdate = (payload) => ({
  type: DEPARTMENT_UPDATE,
  payload: payload,
});
const sortOrderUpdate = (payload) => ({
  type: SORT_ORDER_UPDATE,
  payload: payload,
});
const searchQueryUpdate = (payload) => ({
  type: SEARCH_QUERY_UPDATE,
  payload: payload,
});

const initialState = {
  workers: null,
  isLoading: false,
  error: null,
  filters: {
    searchKey: "",
    sortBy: SORT_BY[0].value,
    selectedDepId: DEPARTMENTS[0].id,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case WORKERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case WORKERS_RESPONSE:
      return {
        ...state,
        workers: action.payload,
        isLoading: false,
        error: null,
      };
    case WORKERS_ERROR:
      return {
        ...state,
        workers: null,
        isLoading: false,
        error: action.payload,
      };
    case DEPARTMENT_UPDATE:
      return {
        ...state,
        workers: action.payload.workers,
        filters: action.payload.filters,
      };
    case SORT_ORDER_UPDATE:
      return {
        ...state,
        workers: action.payload.workers,
        filters: action.payload.filters,
      };
    case SEARCH_QUERY_UPDATE:
      return {
        ...state,
        workers: action.payload.workers,
        filters: action.payload.filters,
      };

    default:
      return state;
  }
}
// Loop through received data,
// append 4 additional properties(without modifying the original data)
// and sort by default ordering
const prepareWorkers = (workers) => {
  return workers
    .map((w) => ({
      ...w,
      fullName: `${w.firstName} ${w.lastName}`,
      isInSearch: true,
      isInSelectedDep: true,
      displayBirthdate: formatDate(w.birthday),
    }))
    .sort(SORT_BY[0].comparer);
};

// api call
export const fetchWorkers = () => {
  return (dispatch) => {
    dispatch(workersRequest());
    axiosInstance
      .get(`/users`)
      .then(({ data }) => {
        const preparedData = prepareWorkers(data.items);
        dispatch(workersRequestFulfilled(preparedData));
      })
      .catch((error) => {
        dispatch(workersRequestFailed(error));
      });
  };
};

// Initially selected department is 'ALL'
// when selected department is changing, loop through the whole workers
// and update the value of 'isInSelectedDep' property(DO NOT REMOVE the worker, just update the prop value )
export const updateDepartment = (depId) => {
  return (dispatch, getState) => {
    const { workers, filters } = getState().workers;
    const isAllSelected = depId === DEPARTMENTS[0].id;

    // update each worker's 'isInSelectedDep' property depending on selected department
    const updatedWorkers = workers.map((worker) => ({
      ...worker,
      isInSelectedDep: isAllSelected || worker.department === depId,
    }));

    dispatch(
      departmentUpdate({
        workers: updatedWorkers,
        filters: { ...filters, selectedDepId: depId },
      })
    );
  };
};

export const updateSortOrder = (sortOrder) => {
  return (dispatch, getState) => {
    const comparer =
      sortOrder === SORT_BY[0].value
        ? compareByFullName
        : compareByClosestBirthday;
    const { workers, filters } = getState().workers;
    const sortedWorkers = workers.sort(comparer);
    dispatch(
      sortOrderUpdate({
        workers: sortedWorkers,
        filters: { ...filters, sortBy: sortOrder },
      })
    );
  };
};

const checkForMatch = (searchKey, fullName, nick) => {
  const searchKeyLower = searchKey.toLowerCase();
  const isNickMatches =
    searchKey.length < 3 && nick.toLowerCase().includes(searchKeyLower);
  return isNickMatches || fullName.toLowerCase().includes(searchKeyLower);
};

// Update the value of 'isInSearch' property
export const updateSearchQuery = (searchKey) => {
  return (dispatch, getState) => {
    const { workers, filters } = getState().workers;
    const isSerchInputEmpty = searchKey === "";

    // update each worker's 'isInSearch' property depending on search text
    const updatedWorkers = workers.map((worker) => ({
      ...worker,
      isInSearch:
        isSerchInputEmpty ||
        checkForMatch(searchKey, worker.fullName, worker.userTag),
    }));

    dispatch(
      searchQueryUpdate({
        workers: updatedWorkers,
        filters: { ...filters, searchKey },
      })
    );
  };
};
