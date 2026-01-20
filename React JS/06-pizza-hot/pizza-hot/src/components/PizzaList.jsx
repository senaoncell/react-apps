// Component representing a single pizza
import Pizza from "./Pizza";
// Custom hook used for API requests
import useFetch from "../hooks/useFetch";

// Configuration for GET request
const config = {
  method: "GET",
};

export default function PizzaList() {
  // We retrieve pizzas from the API using useFetch 
  // data → list of incoming pizzas
  // isLoading → loading status
  // error → error message
  const { data, isLoading, error } = useFetch(
    "http://localhost:3000/pizzas",
    config,
    [] // initial value (empty array)
  );

  // Message to be displayed while data is loading
  if (isLoading) {
    return <div className="alert alert-warning">Yükleniyor...</div>;
  }

  // Show error message if there is an error
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
     // Pizza listesinin kapsayıcısı
    <div className="pizza-list">
      <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-4">
        {/* Create a Pizza component for each pizza received from the API */}
        {data.map((pizza) => (
          <Pizza pizza={pizza} // Pizza information
          key={pizza.id} // Unique key for Reacts
          /> 
        ))}
      </div>
    </div>
  );
}