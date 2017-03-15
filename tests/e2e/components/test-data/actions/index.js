import Chance from 'chance';
export const FETCH_SWAPI_DATA = 'FETCH_SWAPI_DATA';

const chance = new Chance();

export function fetchSwapiData(initialState) {
  return {
    type: FETCH_SWAPI_DATA,
    payload: new Promise((resolve) => {
      setTimeout(() => resolve({
        'props': JSON.stringify(initialState),
        'name': chance.name(),
        'height': chance.integer({ min: 90, max: 300 }),
        'eye_color': chance.color(),
        'birth_year': chance.birthday().toString(),
        'gender': chance.gender(),
        'created': chance.date().toString(),
        'edited': chance.date().toString(),
        'url': chance.url()
      }), 350);
    })
  };
}
