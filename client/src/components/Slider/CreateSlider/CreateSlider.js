import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { ALL_SLIDERS } from "../../../GraphQL/Query";
import { CREATE_SLIDER } from "../../../GraphQL/Mutation";

const CreateSlider = () => {
  const [createSlider] = useMutation(CREATE_SLIDER, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles([...e.target.files]);
    }
    if (!e.target.files) return;
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (files.length > 0) {
      createSlider({
        variables: { files },
        refetchQueries: [{ query: ALL_SLIDERS }],
      });
      document.getElementById("myCreateForm").reset();
      setFiles([]);
    } else {
      console.log("no file");
    }
  };
  return (
    <div className="fileInputContainer">
      <h1>Upload Slide</h1>
      <form onSubmit={handleUpload} id="myCreateForm">
        <input type="file" onChange={handleFileChange} multiple />
        <button className="btn" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default CreateSlider;
