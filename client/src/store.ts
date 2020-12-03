import { createStore, combineReducers, applyMiddleware, Reducer } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { usersReducer, UserStateInterface, initialState as userInitialState } from "./reducers/usersReducers";
import { statusReducer, StatusStateInterface, initialState as statusInitialState } from "./reducers/statusReducers";
import { messageReducer, MessageStateInterface, initialState as messageInitialState } from "./reducers/messageReducers";
import { gameReducer, GameStateInterface, intitalState as gameInitialState } from "./reducers/gameReducers";

export interface ApplicationState {
    users: UserStateInterface;
    status: StatusStateInterface;
    message: MessageStateInterface;
    game: GameStateInterface;
}

const reducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    users: usersReducer,
    status: statusReducer,
    message: messageReducer,
    game: gameReducer,
});

const initialState: ApplicationState = {
    users: userInitialState,
    status: statusInitialState,
    message: messageInitialState,
    game: gameInitialState,
};

// for future integration with thunk such as storing user information in a database

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
