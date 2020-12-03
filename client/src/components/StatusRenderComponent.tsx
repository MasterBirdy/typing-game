import { useSelector } from "react-redux";
import { ApplicationState } from "../store";
import { StatusStateInterface } from "../reducers/statusReducers";

interface StatusRenderComponentProps {
    render: (state: StatusStateInterface) => JSX.Element;
}

// used to expose the state status as a render prop

const StatusRenderComponent: React.FC<StatusRenderComponentProps> = ({ render }) => {
    const state = useSelector((state: ApplicationState) => state.status);
    return <>{render(state)}</>;
};

export default StatusRenderComponent;
