export const FETCH_SWAPI_DATA = 'FETCH_SWAPI_DATA';

export function fetchSwapiData(initialState) {
  return {
    type: FETCH_SWAPI_DATA,
    payload: new Promise((resolve) => {
      setTimeout(() => resolve(initialState), 350);
    })
  };
}
