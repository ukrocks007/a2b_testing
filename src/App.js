import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Layout from "./Layout";

function App() {
  const [layoutId, setLayoutId] = useState(0);
  const id = localStorage.getItem("uid");
  useEffect(() => {
    if (!layoutId) {
      axios
        .get("http://localhost:2000/layout", {
          headers: {
            uid: id,
          },
        })
        .then((res) => {
          const { id, layout } = res.data;
          if (id) {
            localStorage.setItem("uid", id);
          }
          if (layout && !layoutId) {
            setLayoutId(layout);
            console.log("Assigned the layout id", layout);
          }
        })
        .catch((ex) => {
          console.log(ex);
        });
    }
  }, []);
  return <Layout layoutId={layoutId} />;
}

export default App;
