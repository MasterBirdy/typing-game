import { Action } from "redux";
import { ApplicationState } from "../store";
import { ThunkAction } from "redux-thunk";

type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ApplicationState, unknown, Action<string>>;

export default AppThunk;
