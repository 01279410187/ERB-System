import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Warehouse from "./applications/warehouse/Warehouse";
import {
  ShowSuppliers,
  AddSupplier,
  ShowSupplierInvoices,
  EditSuppliers,
} from "./applications/warehouse/sections/suppliers/pages";
import Suppliers from "./applications/warehouse/sections/suppliers/Suppliers";
// import Recipes from "./applications/warehouse/sections/recipes/RecipesCategoryParent";
// import { AddRecipe, EditRecipe, ShowRecipes } from "./applications/warehouse/sections/recipes/pages";
import {
  AddRecipes,
  DeleteRecipes,
  EditRecipes,
  ShowRecipe,
  ShowRecipeDetails,
} from "./applications/warehouse/sections/recipes/recipe/pages";

import Departments from "./applications/warehouse/sections/recipes/Departments/Departments";
import RecipesSubCategory from "./applications/warehouse/sections/recipes/recipeSubCategory/RecipeSubCategory";
import {
  AddRecipeSubCategory,
  DeleteRecipeSubCategory,
  EditRecipeSubCategory,
  ShowRecipesSubCategory,
} from "./applications/warehouse/sections/recipes/recipeSubCategory/pages";
import Recipe from "./applications/warehouse/sections/recipes/recipe/Recipe";
import RecipesCategoryParent from "./applications/warehouse/sections/recipes/recipeCategoryParent/RecipesCategoryParent";
import {
  AddRecipeCategoryParent,
  EditRecipeCategoryParent,
  ShowRecipesCategoryParent,
} from "./applications/warehouse/sections/recipes/recipeCategoryParent/pages";
import Invoice from "./applications/warehouse/sections/invoices/Invoice";
import InvoiceCategories from "./applications/warehouse/sections/invoices/InvoiceCategory/InvoiceCategory";
import IncomingInvoice from "./applications/warehouse/sections/invoices/Incoming/IncomingInvoice";
import { AddInvoices, PrintInvoice } from "./applications/warehouse/sections/invoices/Incoming/pages";
import Requests from "./applications/warehouse/sections/requests/Requests";
import {
  AddRequest,
  EditRequest,
  ShowRequests,
} from "./applications/warehouse/sections/requests/pages";
import {
  AddCashierOrder,
  OpenedTables,
  OrderDetails,
  CashierWarehouseRequests,
  CashierKitchenRequests,
} from "./applications/warehouse/sections/cashier/pages";
import UnderLimit from "./applications/warehouse/sections/underLimit/UnderLimit";
import { ShowExpireLimit, ShowUnderLimit } from "./applications/warehouse/sections/underLimit/pages";
import Resturants from "./applications/warehouse/sections/Kitchen/categories/Resturants/Returants";
import Category from "./applications/warehouse/sections/Kitchen/categories/Category/Category";
import Cashiers from "./applications/warehouse/sections/cashier/Cashiers";
import {
  AddSubCategory,
  EditSubCategory,
  ShowSubCategory,
} from "./applications/warehouse/sections/Kitchen/categories/subCategory/pages";
import Product from "./applications/warehouse/sections/Kitchen/categories/product/Product";
import {
  AddProduct,
  AddProductRecipe,
  AddProductToDepartment,
  EditProduct,
  ShowProduct,
} from "./applications/warehouse/sections/Kitchen/categories/product/pages";
import KitchenRequests from "./applications/warehouse/sections/cashier/pages/KitchenRequests/KitchenRequests";
import Department from "./applications/warehouse/sections/department/Deaprtment";
import ShowDepartment from "./applications/warehouse/sections/department/pages/ShowDepartments";
import { AddDepartments, EditDepartment, ShowProductDepartment } from "./applications/warehouse/sections/department/pages";
import Unit from "./applications/warehouse/sections/unit/Unit";
import { AddUnits, EditUnits, ShowUnits } from "./applications/warehouse/sections/unit/pages";

function App() {
  return (
    <div className="page-wrapper">
      <Routes>
        <Route path="/warehouse" element={<Warehouse />}>
          <Route path="/warehouse/admin" element={<Suppliers />}></Route>
        </Route>
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
              path="/warehouse/suppliers/:id/edit-supplier"
              element={<EditSuppliers />}
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
          <Route path="/warehouse/returants" element={<Category />}>
            <Route
              path="/warehouse/returants/show-resturants"
              element={<Resturants />}
            ></Route>

            <Route
              path="/warehouse/returants/show-subCategory/:id"
              element={<ShowSubCategory />}
            ></Route>

            <Route
              path="/warehouse/returants/add-subcategory/:id"
              element={<AddSubCategory />}
            ></Route>

            <Route
              path="/warehouse/returants/subCategory/:id/edit-subCategory"
              element={<EditSubCategory />}
            ></Route>
          </Route>
        </Route>

        <Route path="/warehouse" element={<Warehouse />}>
          <Route path="/warehouse/returants/subcategory" element={<Product />}>
            <Route
              path="/warehouse/returants/subcategory/show-product/:id"
              element={<ShowProduct />}
            ></Route>

            <Route
              path="/warehouse/returants/subcategory/add-product/:id"
              element={<AddProduct />}
            ></Route>


            <Route
              path="/warehouse/returants/subcategory/add-product-to-department/:id"
              element={<AddProductToDepartment />}
            ></Route>

            <Route
              path="/warehouse/returants/subcategory/:id/edit-product"
              element={<EditProduct />}
            ></Route>

            <Route
              path="/warehouse/returants/subcategory/:id/add-rescipes"
              element={<AddProductRecipe />}
            ></Route>
          </Route>
        </Route>

        <Route path="/warehouse" element={<Warehouse />}>
          <Route
            path="/warehouse/recipes/subCategory"
            element={<RecipesSubCategory />}
          >
            <Route
              path="/warehouse/recipes/subCategory/show-recipe-subcategory/:id"
              element={<ShowRecipesSubCategory />}
            ></Route>

            <Route
              path="/warehouse/recipes/subCategory/add-recipes/:id"
              element={<AddRecipeSubCategory />}
            ></Route>
            <Route
              path="/warehouse/recipes/subCategory/delete-recipes/:id"
              element={<DeleteRecipeSubCategory />}
            ></Route>
            <Route
              path="/warehouse/recipes/subCategory/:id/edit-recipes"
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
              path="/warehouse/recipes/recipe/add-recipes/:id"
              element={<AddRecipes />}
            ></Route>
            <Route
              path="/warehouse/recipes/recipe/delete-recipes/:id"
              element={<DeleteRecipes />}
            ></Route>
            <Route
              path="/warehouse/recipes/recipe/:id/edit-recipes"
              element={<EditRecipes />}
            ></Route>
          </Route>
        </Route>

        <Route path="/warehouse" element={<Warehouse />}>
          <Route path="/warehouse/invoices" element={<Invoice />}>
            <Route
              path="/warehouse/invoices/show"
              element={<InvoiceCategories />}
            ></Route>

            <Route
              path="/warehouse/invoices/show"
              element={<InvoiceCategories />}
            ></Route>

            <Route
              path="/warehouse/invoices/print/:id"
              element={<PrintInvoice />}
            ></Route>

            <Route
              path="/warehouse/invoices/incoming"
              element={<IncomingInvoice />}
            >
              <Route
                path="/warehouse/invoices/incoming/add-Invoices/in_coming"
                element={<AddInvoices />}
              />

              <Route
                path="/warehouse/invoices/incoming/add-Invoices/out_going"
                element={<AddInvoices />}
              />
              <Route
                path="/warehouse/invoices/incoming/add-Invoices/returned"
                element={<AddInvoices />}
              />
            </Route>

            {/* <Route path="/warehouse/invoices/outgoing" element={<OutgoingInvoice />}>
              <Route path="/warehouse/invoices/outgoing/show-outgoing" element={<ShowOutgoingInvoice />} />
            </Route>
            <Route path="/warehouse/invoices/returned" element={<ReturnedInvoice />}>
              <Route path="/warehouse/invoices/returned/show-returned" element={<ShowReturnedInvoice />} />
            </Route> */}
          </Route>
        </Route>
        <Route path="/warehouse" element={<Warehouse />}>
          <Route
            path="/warehouse/underLimit/show-under-limit"
            element={<UnderLimit />}
          >
            <Route
              path="/warehouse/underLimit/show-under-limit"
              element={<ShowUnderLimit />}
            ></Route>
            <Route
              path="/warehouse/underLimit/show-under-limit/show-expire-limit"
              element={<ShowExpireLimit />}
            ></Route>
          </Route>
        </Route>

        <Route path="/warehouse" element={<Warehouse />}>
          <Route path="/warehouse/requests" element={<Requests />}>
            <Route
              path="/warehouse/requests/show-requests"
              element={<ShowRequests />}
            ></Route>
            <Route
              path="/warehouse/requests/add-request"
              element={<AddRequest />}
            ></Route>
            <Route
              path="/warehouse/requests/:id/edit-request"
              element={<EditRequest />}
            ></Route>
          </Route>
        </Route>

        <Route path="/warehouse" element={<Warehouse />}>
          <Route path="/warehouse/cashier" element={<Cashiers />}>
            <Route
              path="/warehouse/cashier/create-order"
              element={<AddCashierOrder />}
            ></Route>
            <Route
              path="/warehouse/cashier/opened-tables"
              element={<OpenedTables />}
            ></Route>
            <Route
              path="/warehouse/cashier/order/:id"
              element={<OrderDetails />}
            ></Route>
            <Route
              path="/warehouse/cashier/warehouse-requests"
              element={<CashierWarehouseRequests />}
            ></Route>
            <Route
              path="/warehouse/cashier/add-orders"
              element={<CashierKitchenRequests />}
            ></Route>
            <Route
              path="/warehouse/cashier/kitchen-requests"
              element={<KitchenRequests />}
            ></Route>
          </Route>
        </Route>


        <Route path="/warehouse" element={<Warehouse />}>
          <Route path="/warehouse/departments" element={<Department />}>
            <Route
              path="/warehouse/departments/show-departments"
              element={<ShowDepartment />}
            ></Route>
            <Route
              path="/warehouse/departments/add-departments"
              element={<AddDepartments />}
            ></Route>
            <Route
              path="/warehouse/departments/:id/edit-departments"
              element={<EditDepartment />}
            ></Route>
            <Route
              path="/warehouse/departments/show-departments/product/:id"
              element={<ShowProductDepartment />}
            ></Route>

            <Route
              path="/warehouse/departments/add-product-to-department/:id"
              element={<AddProductToDepartment />}
            ></Route>

          </Route>
        </Route>


        <Route path="/warehouse" element={<Warehouse />}>
          <Route path="/warehouse/units" element={<Unit />}>
            <Route
              path="/warehouse/units/show-units"
              element={<ShowUnits />}
            ></Route>
            <Route
              path="/warehouse/units/add-units"
              element={<AddUnits />}
            ></Route>
            <Route
              path="/warehouse/units/:id/edit-units"
              element={<EditUnits />}
            ></Route>

          </Route>
        </Route>
      </Routes>






      {/* <Route path="/warehouse" element={<Warehouse />}>
        <Route
          path="/warehouse/returants/show-resturants"
          element={<Resturants />}
        ></Route>
      </Route> */}

      {/* <Routes >
        <Route path="/Kitchen" element={<Kitchen />}>
          <Route path="/Kitchen/resturants" element={<Kitchen />}>
            <Route
              path="/Kitchen/resturants/show-resturants"
              element={<Resturants />}
            ></Route>
          </Route>

        </Route>
    </Routes>*/}
    </div>
  );
}

export default App;
