import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Layout from "./components/Layout/Layout";
import AgriculturalDataInsights from "./components/AgriculturalDataInsights/AgriculturalDataInsights";
import PageUnderConstruction from "./components/PageUnderConstruction/PageUnderConstruction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login/>} />
          <Route element={<Layout/>}>
            <Route path="/agriculturaldatainsights" element={<AgriculturalDataInsights/>}/>
            <Route path="/underconstruction" element={<PageUnderConstruction/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
