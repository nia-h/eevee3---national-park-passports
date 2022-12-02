export interface Park {
  pk_park_id: string;
  park_name: string;
  park_code: string;
  state: string;
  // visitedUser: any?;
}

export interface User {
  pk_user_id: string | null;
  email: string | null;
  // visitedPark: Array<any>;
}
