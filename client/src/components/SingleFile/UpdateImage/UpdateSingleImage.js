import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import "./UpdateSingleImage.css";
import { ALL_FILES } from "../../../GraphQL/Query";
import { UPDATE_FILE } from "../../../GraphQL/Mutation";

const UpdateSingleImage = () => {
  const [editId, setEditId] = useState("");
  const { loading, error, data } = useQuery(ALL_FILES);
  const handleEdit = (id) => {
    setEditId(id);
  };

  const [updateFile] = useMutation(UPDATE_FILE, {
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
  const handleUpdate = (e) => {
    e.preventDefault();
    if (file.name) {
      updateFile({
        variables: { file: file, fileId: editId },
        refetchQueries: [{ query: ALL_FILES }],
      });
      setEditId("");
      document.getElementById("myUpdateForm").reset();
      setFile({});
    } else {
      console.log("no file");
    }
  };
  return (
    <div>
      <div className="singleImageDiv">
        {data &&
          data.users.map((u,i) => (
            <img
              key={i}
              className="singleImage"
              onClick={() => handleEdit(u._id)}
              src={`http://localhost:5000/images/${u.file}`}
            />
          ))}
      </div>
      {editId !== "" && (
        <div className="fileInputContainer">
          <h1>Update File</h1>
          <form onSubmit={handleUpdate} id="myUpdateForm">
            <input type="file" onChange={handleFileChange} />
            <button className="btn" type="submit">
              Upload
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateSingleImage;
