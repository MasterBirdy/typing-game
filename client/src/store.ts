import { createStore, combineReducers, applyMiddleware, Reducer } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { usersReducer, UserStateInterface, initialState as userInitialState } from "./reducers/usersReducers";
import { statusReducer, StatusStateInterface, initialState as statusInitialState } from "./reducers/statusReducers";
import { messageReducer, MessageStateInterface, initialState as messageInitialState } from "./reducers/messageReducers";

export interface ApplicationState {
    users: UserStateInterface;
    status: StatusStateInterface;
    message: MessageStateInterface;
}

const reducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    users: usersReducer,
    status: statusReducer,
    message: messageReducer,
});

const initialState: ApplicationState = {
    users: userInitialState,
    status: statusInitialState,
    message: messageInitialState
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
