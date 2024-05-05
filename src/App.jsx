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
import Invoice from "./applications/warehouse/sections/invoices/Invoice";
import InvoiceCategories from "./applications/warehouse/sections/invoices/InvoiceCategory/InvoiceCategory";
import IncomingInvoice from "./applications/warehouse/sections/invoices/Incoming/IncomingInvoice";
import OutgoingInvoice from "./applications/warehouse/sections/invoices/Outgoing/OutgoingInvoice";
import ReturnedInvoice from "./applications/warehouse/sections/invoices/Returned/ReturnedInvoice";
import ShowIncomingInvoice from "./applications/warehouse/sections/invoices/Incoming/pages/ShowIncomingInvoice";
import ShowOutgoingInvoice from "./applications/warehouse/sections/invoices/Outgoing/pages/ShowOutgoingInvoice";
import ShowReturnedInvoice from "./applications/warehouse/sections/invoices/Returned/pages/ShowReturnedInvoice";
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


        <Route path="/warehouse" element={<Warehouse />}>
          <Route path="/warehouse/invoices" element={<Invoice />}>

            <Route path="/warehouse/invoices/show" element={<InvoiceCategories />}></Route>

            <Route path="/warehouse/invoices/incoming" element={<IncomingInvoice />}>
              <Route path="/warehouse/invoices/incoming/show-incomig" element={<ShowIncomingInvoice />} />
            </Route>
            <Route path="/warehouse/invoices/outgoing" element={<OutgoingInvoice />}>
              <Route path="/warehouse/invoices/outgoing/show-outgoing" element={<ShowOutgoingInvoice />} />
            </Route>
            <Route path="/warehouse/invoices/returned" element={<ReturnedInvoice />}>
              <Route path="/warehouse/invoices/returned/show-returned" element={<ShowReturnedInvoice />} />
            </Route>


          </Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
