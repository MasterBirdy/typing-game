import { SocketProvider } from "./context/SocketContext";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

function App() {
    return (
        <SocketProvider>
            <NavBar />
            <Home />
        </SocketProvider>
    );
}

export default App;
