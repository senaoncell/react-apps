import Header from "./components/Header";
import ProductList from "./components/ProductList";

export default function App(){
  return(
    <>
      <Header/>
      <div className='container mt-3'>
        <ProductList/>
      </div>
    </>  
  
  );
}