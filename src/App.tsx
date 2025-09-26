import { Route, Routes } from "react-router-dom";
import VirtualBusinessCard from "@/components/VirtualBusinessCard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<VirtualBusinessCard />} />
      <Route path="*" element={<VirtualBusinessCard />} />
    </Routes>
  );
};

export default App;
