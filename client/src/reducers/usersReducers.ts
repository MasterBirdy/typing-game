import { ADD_USER, SET_USERS_LIST, UserActionTypes, User } from "../constants/userConstants";

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
        default:
            return state;
    }
};
