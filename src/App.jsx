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
import Recipes from "./applications/warehouse/sections/recipes/RecipesSubCategory";
import { AddRecipe, EditRecipe, ShowRecipes } from "./applications/warehouse/sections/recipes/pages";
import Departments from "./applications/warehouse/sections/recipes/Departments/Departments"
import RecipesSubCategory from "./applications/warehouse/sections/recipes/recipeSubCategory/RecipeSubCategory";
import { AddRecipeSubCategory, DeleteRecipeSubCategory, EditRecipeSubCategory, ShowRecipesSubCategory } from "./applications/warehouse/sections/recipes/recipeSubCategory/pages";
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



        <Route path="/warehouse" element={<Warehouse />}>
          <Route path="/warehouse/recipes/subCategory" element={<RecipesSubCategory />}>
            <Route
              path="/warehouse/recipes/subCategory/show-recipe-subcategory/:id"
              element={<ShowRecipesSubCategory />}
            ></Route>

            <Route
              path="/warehouse/recipes/subCategory/add-recipes"
              element={<AddRecipeSubCategory />}
            ></Route>
            <Route
              path="/warehouse/recipes/subCategory/delete-recipes/:id"
              element={< DeleteRecipeSubCategory />}
            ></Route>
            <Route
              path="/warehouse/recipes/subCategory/edit-recipes/:id"
              element={<EditRecipeSubCategory />}
            ></Route>

          </Route>
        </Route>


      </Routes>
    </div>
  );
}

export default App;
