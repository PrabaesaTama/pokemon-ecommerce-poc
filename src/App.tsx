import { Route } from "react-router";
import HomePage from "./pages/HomePage";
import { Routes } from "react-router";
import NavigationBar from "./components/NavigationBar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CardDetailPage from "./pages/CardDetailPage";

function App() {
  return (
    <>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="card">
          <Route path=":cardId" element={<CardDetailPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
