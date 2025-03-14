export interface City {
  name: string;
  zipCodes: number[];
}

export interface State {
  state: string;
  cities: City[];
}

// make expo happy
export default function typeScript() {
  return;
}
