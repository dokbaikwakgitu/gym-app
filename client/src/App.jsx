import { useEffect, useState } from "react";
import api from "./api/axios";

export default function App() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    api.get("/classes").then((res) => setClasses(res.data.data.classes));
  }, []);

  return <pre>{JSON.stringify(classes, null, 2)}</pre>;
}