export type User = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  address: {
    street: string;
    country?: string;
    country_code: string;
    state: string;
    city: string;
  };
  phone: string;
  zip_code: string;
};
