import "./App.css";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",

        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{
          width: "auto",
        }}
      />

      <Helmet>
        <style>{"body { background-color: #f9fafb; }"}</style>
      </Helmet>
      <AnalyticsDashboard />
    </div>
  );
}

export default App;
