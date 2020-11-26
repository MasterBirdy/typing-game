import { ADD_USER, DELETE_USER, SET_USERS_LIST, UserActionTypes } from "../constants/userConstants";

export interface UserStateInterface {
    users: string[];
}

export const initialState: UserStateInterface = {
    users: [],
};

export const usersReducer = (state = initialState, action: UserActionTypes) => {
    switch (action.type) {
        case SET_USERS_LIST:
            return {
                users: action.payload,
            };
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload],
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user !== action.payload),
            };
        default:
            return state;
    }
};
