import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Warehouse from "./applications/warehouse/Warehouse";
import {
  ShowSuppliers,
  AddSupplier,
  DeleteSupplier,
  ShowSupplierInvoices,
} from "./applications/warehouse/sections/suppliers/pages";
import Suppliers from "./applications/warehouse/sections/suppliers/Suppliers";
import Recipes from "./applications/warehouse/sections/recipes/Recipes";
import { ShowRecipes } from "./applications/warehouse/sections/recipes/pages";
import AddRecipe from "./applications/warehouse/sections/recipes/pages/AddRecipe";
import EditRecipe from "./applications/warehouse/sections/recipes/pages/EditRecipe";
import Departments from "./applications/warehouse/sections/recipes/Departments/Departments"
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
              path="/warehouse/suppliers/add-supplier"
              element={<AddSupplier />}
            ></Route>
            <Route
              path="/warehouse/suppliers/delete-supplier/:id"
              element={<DeleteSupplier />}
            ></Route>
            <Route
              path="/warehouse/suppliers/edit-supplier/:id"
              element={<ShowSuppliers />}
            ></Route>
            <Route
              path="/warehouse/suppliers/:id/show-invoices"
              element={<ShowSupplierInvoices />}
            ></Route>
          </Route>
        </Route>

        <Route path="/warehouse" element={<Warehouse />}>
          <Route path="/warehouse/recipes" element={<Recipes />}>
            <Route
              path="/warehouse/recipes/show-departments"
              element={<Departments />}
            ></Route>
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
