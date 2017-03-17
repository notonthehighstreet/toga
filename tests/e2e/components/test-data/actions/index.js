import Chance from 'chance';
export const FETCH_SWAPI_DATA = 'FETCH_SWAPI_DATA';

const chance = new Chance();

const fullData = (initialState) => {
  const data = {
    'name': chance.name(),
    'height': chance.integer({ min: 90, max: 300 }),
    'eye_color': chance.color(),
    'birth_year': chance.birthday().toString(),
    'gender': chance.gender(),
    'created': chance.date().toString(),
    'edited': chance.date().toString(),
    'url': chance.url()
  };
  const props = (initialState && Object.keys(initialState).length > 0)
    ? JSON.stringify(initialState)
    : false;
  return props ? { props, ...data } : data;
};

export function fetchSwapiData(initialState) {
  return {
    type: FETCH_SWAPI_DATA,
    payload: new Promise((resolve) => {
      setTimeout(() => resolve(fullData(initialState)), 350);
    })
  };
}
