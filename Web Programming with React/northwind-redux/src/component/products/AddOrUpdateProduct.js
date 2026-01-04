import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"; // v6
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";

function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history,
  ...props
}) {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [product, setProduct] = useState({ ...props.product });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    //setProduct({ ...props.product });
    if (productId && products.length > 0) {
      const currentProduct = products.find(p => p.id === productId) || {};
      setProduct(currentProduct);
    } else if (!productId) {
      setProduct({});
    }
  }, [categories.length, products, productId, getCategories]);
   //[categories.length, props.product, getCategories]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));
    validate(name, value);
  }

  function validate(name, value) {
    if (name === "productName" && value === "") {
      setErrors((previousErrors) => ({
        ...previousErrors,
        productName: "Ürün İsmi Girmeniz Gerekiyor",
      }));
    } else {
      setErrors((previousErrors) => ({ ...previousErrors, productName: "" }));
    }
  }

  function handleSave(event) {
    event.preventDefault();
    saveProduct(product).then(() => {
      //history.push("/");
      navigate("/");

    });
  }
  
  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  );
}

/* export function getProductById(products, productId) {
  let product = products.find((product) => product.id === productId) || null;
  return product;
} */

function mapStateToProps(state, ownProps) {
  /* const productId = ownProps.match.params.productId;  
  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId)
      : {}; */
  return {
    //product,
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
