import { Route } from "react-router";
import HomePage from "./pages/HomePage";
import { Routes } from "react-router";
import NavigationBar from "./components/NavigationBar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CardDetailPage from "./pages/CardDetailPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="card">
          <Route path=":cardId" element={<CardDetailPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
