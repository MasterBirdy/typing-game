import { useSelector } from "react-redux";
import { ApplicationState } from "../store";
import { StatusStateInterface } from "../reducers/statusReducers";

interface StatusRenderComponentProps {
    render: (state: StatusStateInterface) => JSX.Element;
}

const StatusRenderComponent: React.FC<StatusRenderComponentProps> = ({ render }) => {
    const state = useSelector((state: ApplicationState) => state.status);
    return <>{render(state)}</>;
};

export default StatusRenderComponent;
