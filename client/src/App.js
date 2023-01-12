import { Route, Routes } from "react-router-dom";
import About from "./client/About";
import Contact from "./client/Contact";
import Home from "./client/Home";
import Works from "./client/Works";
import Header from "./inc/Header";
import Admin from "./layout/Admin";
import Client from "./layout/Client";


function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Admin />} >
          <Route path="" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="works" element={<Works />} />
          <Route path="*" element={"Page Not Found"} />
        </Route>
        <Route path="/" element={<Client />} >
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Works />} />
          <Route path="/*" element={"Page Not Found"} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
