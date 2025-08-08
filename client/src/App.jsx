import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateInvoice from "./pages/CreateInvoice";
import AllInvoice from "./pages/AllInvoice";
import InvoiceViewer from "./pages/InvoiceViewer";
function App() {
  return (
    <div className="flex h-screen overflow-auto">
      <Router>
        <Routes>
          <Route path="/" element={<AllInvoice/>} />
          <Route path="/Create-Invoice" element={<CreateInvoice/>} />
           <Route path="/:id" element={<InvoiceViewer/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
