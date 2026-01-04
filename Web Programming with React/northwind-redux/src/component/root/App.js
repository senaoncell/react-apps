import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router-dom";
import CartDetail from "../cart/CartDetail";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
import NotFound from "../common/NotFound";

function App() {
  return (
    <Container>
      <Navi/>
      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>        
        <Route path="/product" element={<Dashboard/>}></Route>        
        <Route path="/cart" element={<CartDetail/>}></Route> 
        <Route path="/saveproduct/:productId" element={<AddOrUpdateProduct />} />
        <Route path="/saveproduct"  element={<AddOrUpdateProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
}

export default App;
