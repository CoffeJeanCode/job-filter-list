import { Suspense } from "react";
import { Heading } from "./components/Heading";
import { JobsColletion } from "./components/JobsColletion";
import "./normalize.css";
import "./App.css";

function App() {
  return (
    <>
      <Heading />
      <Suspense fallback={<div>Loading....</div>}>
        <JobsColletion />
      </Suspense>
    </>
  );
}

export default App;
