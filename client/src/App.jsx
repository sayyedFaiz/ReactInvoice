import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateInvoice from "./pages/CreateInvoice";
import AllInvoice from "./pages/AllInvoice";
import InvoiceViewer from "./pages/InvoiceViewer";
import CustomerForm from "./components/CustomerForm";
import AllCustomers from "./pages/AllCustomers"
function App() {
  return (
    <div className="flex h-screen overflow-auto ">
      <Router>
        <Routes>
          <Route path="/" element={<AllInvoice />} />
          <Route path="/create-invoice" element={<CreateInvoice />} />
          <Route path="/:id" element={<InvoiceViewer />} />
          <Route path="/add-customer" element={<CustomerForm/>} />
           <Route path="/customers" element={<AllCustomers/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
