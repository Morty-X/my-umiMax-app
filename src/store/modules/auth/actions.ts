import { AuthActionTypes } from "./types";

// action creator
export const setCookie = (cookie: string) => {
  return {
    type: AuthActionTypes.SET_COOKIE,
    payload: cookie,
  };
};

export const removeCookie = () => {
  return {
    type: AuthActionTypes.REMOVE_COOKIE,
  } as const;
};

export type AuthAction =
  | ReturnType<typeof setCookie>
  | ReturnType<typeof removeCookie>;
