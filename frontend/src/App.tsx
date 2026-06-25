import { useEffect } from "react";
import "./App.css";
import AppRouter from "./routes/AppRouter";

function App() {
  useEffect(() => {
    // Keep the browser tab title aligned with the scheduling experience.
    document.title = "Scheduler";
  }, []);

  return <AppRouter />;
}

export default App;
