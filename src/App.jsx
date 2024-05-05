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
import InvoiceCategories from "./applications/warehouse/sections/invoices/InvoiceCategory/InvoiceCategory";
import Invoice from "./applications/warehouse/sections/invoices/Invoice";
import ShowIncomingInvoice from "./applications/warehouse/sections/invoices/Incoming/pages/ShowIncomingInvoice";
import ShowOutgoingInvoice from "./applications/warehouse/sections/invoices/Outgoing/pages/ShowOutgoingInvoice";
import ShowReturnedInvoice from "./applications/warehouse/sections/invoices/Returned/pages/ShowReturnedInvoice";
import IncomingInvoice from "./applications/warehouse/sections/invoices/Incoming/IncomingInvoice";
import ReturnedInvoice from "./applications/warehouse/sections/invoices/Returned/ReturnedInvoice";
import OutgoingInvoice from "./applications/warehouse/sections/invoices/Outgoing/OutgoingInvoice";
// import IncomingInvoice from "./applications/warehouse/sections/invoices/Incoming/Invoice";
// import OutgoingInvoice from "./applications/warehouse/sections/invoices/Outcoming/OutgoingInvoice";
// import ReturnedInvoice from "./applications/warehouse/sections/invoices/Returned/ReturnedInvoice";

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
