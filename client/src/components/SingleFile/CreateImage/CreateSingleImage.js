import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { ALL_FILES } from "../../../GraphQL/Query";
import "./CreateSingleImage.css";
import { UPLOAD_FILE } from "../../../GraphQL/Mutation";

const CreateSingleImage = () => {
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const [file, setFile] = useState({});

  const handleFileChange = (e) => {
    const inputFile = e.target.files[0];
    if (file) {
      setFile(inputFile);
    }
    if (!file) return;
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (file.name) {
      uploadFile({
        variables: { file },
        refetchQueries: [{ query: ALL_FILES }],
      });
      document.getElementById("myCreateForm").reset();
      setFile({});
    } else {
      console.log("no file");
    }
  };
  return (
    <div className="fileInputContainer">
      <h1>Upload File</h1>
      <form onSubmit={handleUpload} id="myCreateForm">
        <input type="file" onChange={handleFileChange} />
        <button className="btn" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default CreateSingleImage;
