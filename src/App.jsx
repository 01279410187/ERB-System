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
// import Recipes from "./applications/warehouse/sections/recipes/RecipesCategoryParent";
// import { AddRecipe, EditRecipe, ShowRecipes } from "./applications/warehouse/sections/recipes/pages";
import { AddRecipes, DeleteRecipes, EditRecipes, ShowRecipe, ShowRecipeDetails } from "./applications/warehouse/sections/recipes/recipe/pages";

import Departments from "./applications/warehouse/sections/recipes/Departments/Departments"
import RecipesSubCategory from "./applications/warehouse/sections/recipes/recipeSubCategory/RecipeSubCategory";
import { AddRecipeSubCategory, DeleteRecipeSubCategory, EditRecipeSubCategory, ShowRecipesSubCategory } from "./applications/warehouse/sections/recipes/recipeSubCategory/pages";
import Recipe from "./applications/warehouse/sections/recipes/recipe/Recipe";
import RecipesCategoryParent from "./applications/warehouse/sections/recipes/recipeCategoryParent/RecipesCategoryParent";
import { AddRecipeCategoryParent, EditRecipeCategoryParent, ShowRecipesCategoryParent } from "./applications/warehouse/sections/recipes/recipeCategoryParent/pages";
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
          <Route path="/warehouse/recipes" element={<RecipesCategoryParent />}>
            <Route
              path="/warehouse/recipes/show-departments"
              element={<Departments />}
            ></Route>
            <Route
              path="/warehouse/recipes/show-recipes"
              element={<ShowRecipesCategoryParent />}
            ></Route>
            <Route
              path="/warehouse/recipes/add-recipes-parent"
              element={<AddRecipeCategoryParent />}
            ></Route>
            {/* <Route
              path="/warehouse/recipes/delete-recipes/:id"
              element={<ShowSuppliers />}
            ></Route> */}
            <Route
              path="/warehouse/recipes/edit-recipes-parent/:id"
              element={<EditRecipeCategoryParent />}
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


        <Route path="/warehouse" element={<Warehouse />}>
          <Route path="/warehouse/recipes/recipe" element={<Recipe />}>
            <Route
              path="/warehouse/recipes/recipe/show-recipe/:id"
              element={<ShowRecipe />}
            ></Route>
            <Route
              path="/warehouse/recipes/recipe/details-recipe/:id"
              element={<ShowRecipeDetails />}
            ></Route>

            <Route
              path="/warehouse/recipes/recipe/add-recipes"
              element={<AddRecipes />}
            ></Route>
            <Route
              path="/warehouse/recipes/recipe/delete-recipes/:id"
              element={< DeleteRecipes />}
            ></Route>
            <Route
              path="/warehouse/recipes/recipe/edit-recipes/:id"
              element={<EditRecipes />}
            ></Route>

          </Route>
        </Route>


      </Routes>
    </div>
  );
}

export default App;
