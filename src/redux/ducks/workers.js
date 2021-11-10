import { axiosInstance } from "../../config";
import {
  formatDate,
  compareByFullName,
  compareByClosestBirthday,
} from "../../util";
import { DEPARTMENTS, SORT_BY } from "../../constants";

export const WORKERS_REQUEST = "kode/HOME_SCREEN/WORKERS_REQUEST";
export const WORKERS_RESPONSE = "kode/HOME_SCREEN/WORKERS_RESPONSE";
export const WORKERS_ERROR = "kode/HOME_SCREEN/WORKERS_ERROR";
export const DEPARTMENT_UPDATE = "kode/HOME_SCREEN/DEPARTMENT_UPDATE";
export const SORT_ORDER_UPDATE = "kode/HOME_SCREEN/SORT_ORDER_UPDATE";
export const SEARCH_QUERY_UPDATE = "kode/HOME_SCREEN/SEARCH_QUERY_UPDATE";

export const workersRequest = () => ({
  type: WORKERS_REQUEST,
});

export const workersRequestFulfilled = (payload) => ({
  type: WORKERS_RESPONSE,
  payload,
});

export const workersRequestFailed = (payload) => ({
  type: WORKERS_ERROR,
  payload: payload,
});
export const departmentUpdate = (payload) => ({
  type: DEPARTMENT_UPDATE,
  payload: payload,
});
export const sortOrderUpdate = (payload) => ({
  type: SORT_ORDER_UPDATE,
  payload: payload,
});
export const searchQueryUpdate = (payload) => ({
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
  hasVisibleData: true,
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
        hasVisibleData: action.payload.hasVisibleData,
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
        hasVisibleData: action.payload.hasVisibleData,
      };

    default:
      return state;
  }
}

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

export const updateDepartment = (depId) => {
  return (dispatch, getState) => {
    const { workers, filters } = getState().workers;
    const isAllSelected = depId === DEPARTMENTS[0].id;

    // update each worker's 'isInSelectedDep' property depending on selected department
    const updatedWorkers = workers.map((worker) => ({
      ...worker,
      isInSelectedDep: isAllSelected || worker.department === depId,
    }));

    const hasVisibleData = updatedWorkers.some(
      (w) => w.isInSelectedDep && w.isInSearch
    );

    dispatch(
      departmentUpdate({
        workers: updatedWorkers,
        filters: { ...filters, selectedDepId: depId },
        hasVisibleData: hasVisibleData,
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

export const updateSearchQuery = (searchKey) => {
  return (dispatch, getState) => {
    const { workers, filters } = getState().workers;

    // update each worker's 'isInSearch' property depending on search text
    const updatedWorkers = workers.map((worker) => ({
      ...worker,
      isInSearch: checkForMatch(searchKey, worker.fullName, worker.userTag),
    }));
    const hasVisibleData = updatedWorkers.some(
      (w) => w.isInSelectedDep && w.isInSearch
    );

    dispatch(
      searchQueryUpdate({
        workers: updatedWorkers,
        filters: { ...filters, searchKey },
        hasVisibleData: hasVisibleData,
      })
    );
  };
};
