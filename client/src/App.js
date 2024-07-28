import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleFile from "./components/SingleFile/SingleFile";
import Home from "./components/Home/Home";
import Slider from "./components/Slider/Slider";
import AddEvent from "./components/Event/AddEvent/AddEvent";
function App() {
  const uploadLink = createUploadLink({
    uri: "http://localhost:5000/graphql",
  });

  const client = new ApolloClient({
    link: uploadLink,
    cache: new InMemoryCache(),
  });
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/singleFile" element={<SingleFile />} />
            <Route path="/slider" element={<Slider />} />
            <Route exact path="/" element={<Home />} />
            <Route path="addEvent" element={<AddEvent />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
