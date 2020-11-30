import { stat } from "fs";
import { ADD_USER, DELETE_USER, SET_USERS_LIST, UserActionTypes, User } from "../constants/userConstants";

export interface UserStateInterface {
    users: { [key: string]: User };
}

export const initialState: UserStateInterface = {
    users: {},
};

export const usersReducer = (state = initialState, action: UserActionTypes): UserStateInterface => {
    switch (action.type) {
        case SET_USERS_LIST:
            return {
                users: action.payload,
            };
        case ADD_USER:
            const user = action.payload;
            const newUsers = { ...state.users };
            newUsers[user.id] = { ...user };
            return {
                ...state,
                users: newUsers,
            };
        case DELETE_USER:
            const deletedUsers = { ...state.users };
            delete deletedUsers[action.payload];
            return {
                ...state,
                users: deletedUsers,
            };
        default:
            return state;
    }
};
