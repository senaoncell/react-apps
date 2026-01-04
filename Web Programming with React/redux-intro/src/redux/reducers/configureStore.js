import { legacy_createStore as createStore} from "redux";

import reducers from "./index"

export default function configureStore(){
    return createStore(reducers)
}


/* import { configureStore } from "@reduxjs/toolkit";
import reducers from "./index";

export default function configureAppStore() {
  return configureStore({
    reducer: reducers,
  });
} */

    
