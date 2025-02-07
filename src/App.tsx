import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Listing from "./pages/Listing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Listing />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
