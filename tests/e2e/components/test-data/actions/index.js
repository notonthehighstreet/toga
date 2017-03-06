import { randomRange, json } from '../utils';

export const FETCH_SWAPI_DATA = 'FETCH_SWAPI_DATA';
const MAX = 87;

export function fetchSwapiData() {
  const cardId = randomRange(1, MAX, 1)[0];
  return {
    type: FETCH_SWAPI_DATA,
    payload: json.get(`http://swapi.co/api/people/${cardId}/`)
  };
}
