import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Warehouse from "./applications/warehouse/Warehouse";
import { ShowSuppliers } from "./applications/warehouse/sections/suppliers/pages";
import Suppliers from "./applications/warehouse/sections/suppliers/Suppliers";
import Recipes from "./applications/warehouse/sections/recipes/Recipes";
import { ShowRecipes } from "./applications/warehouse/sections/recipes/pages";
import AddRecipe from "./applications/warehouse/sections/recipes/pages/AddRecipe";
import EditRecipe from "./applications/warehouse/sections/recipes/pages/EditRecipe";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/warehouse" element={<Warehouse />}>
          <Route path="/warehouse/suppliers" element={<Suppliers />}>
            <Route
              path="/warehouse/suppliers/show-suppliers"
              element={<ShowSuppliers />}
            ></Route>
            <Route
              path="/warehouse/suppliers/add-suppliers"
              element={<ShowSuppliers />}
            ></Route>
            <Route
              path="/warehouse/suppliers/delete-supplier/:id"
              element={<ShowSuppliers />}
            ></Route>
            <Route
              path="/warehouse/suppliers/edit-suppliers/:id"
              element={<ShowSuppliers />}
            ></Route>
            <Route
              path="/warehouse/suppliers/edit-suppliers/:id"
              element={<ShowSuppliers />}
            ></Route>
          </Route>
        </Route>

        <Route path="/warehouse" element={<Warehouse />}>
          <Route path="/warehouse/recipes" element={<Recipes />}>
            <Route
              path="/warehouse/recipes/show-recipes"
              element={<ShowRecipes />}
            ></Route>
            <Route
              path="/warehouse/recipes/add-recipes"
              element={<AddRecipe />}
            ></Route>
            <Route
              path="/warehouse/recipes/delete-recipes/:id"
              element={<ShowSuppliers />}
            ></Route>
            <Route
              path="/warehouse/recipes/edit-recipes/:id"
              element={<EditRecipe />}
            ></Route>

          </Route>
        </Route>


      </Routes>
    </div>
  );
}

export default App;
