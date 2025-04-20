export interface Fields {
  city: string;
  state: string;
  streetAddress: string;
  zipCode: string | number;
  // latitude: number;
  //longitude: number;
}

const addressFields: Fields = {
  city: "",
  state: "",
  streetAddress: "",
  zipCode: 0,
  // latitude: 0,
  // longitude: 0,
};

export default addressFields;
