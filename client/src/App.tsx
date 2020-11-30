import { SocketProvider } from "./context/SocketContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Users from "./pages/Users";
import NavBar from "./components/NavBar";
import StatusRenderComponent from "./components/StatusRenderComponent";
import ProtectedRoute from "./components/ProtectedRoute";
import { Status } from "./constants/statusConstants";
import MessageWrapper from "./components/MessageWrapper";

function App() {
    return (
        <Router>
            <SocketProvider>
                <MessageWrapper />
                <NavBar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/users" exact component={Users} />
                    <StatusRenderComponent
                        render={(state) => (
                            <ProtectedRoute
                                path="/game"
                                exact
                                component={Game}
                                authenticated={state.status === Status.PLAYING}
                            />
                        )}
                    />
                </Switch>
            </SocketProvider>
        </Router>
    );
}

export default App;
