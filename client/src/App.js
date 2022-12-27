import { Route, Routes } from "react-router-dom";
import About from "./client/About";
import Contact from "./client/Contact";
import Home from "./client/Home";
import Header from "./inc/Header";
import Client from "./layout/Client";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Client />} >
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
