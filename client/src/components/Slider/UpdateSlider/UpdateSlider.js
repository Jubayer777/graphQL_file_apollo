import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { UPDATE_SLIDER } from "../../../GraphQL/Mutation";
import { ALL_SLIDERS } from "../../../GraphQL/Query";
import "./UpdateSlider.css";

const UpdateSlider = () => {
  const [editSlide, setEditSlide] = useState({});
  const { loading, error, data } = useQuery(ALL_SLIDERS);
  const handleEdit = (item) => {
    setEditSlide(item);
  };
  const [updateSlider] = useMutation(UPDATE_SLIDER, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const [files, setFiles] = useState([]);
  const handleChange = (event, index) => {
    const inputFile = event.target.files[0];
    const imgObj = { inputFile, index };
    if (inputFile) {
      const matchedItem = files.find((fl) => fl.index === index);
      if (matchedItem) {
        const i = files.indexOf(matchedItem);
        const newFiles = [...files];
        newFiles[i] = imgObj;
        setFiles(newFiles);
      } else {
        setFiles([...files, imgObj]);
      }
    }
    if (!inputFile) return;
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    if (files.length > 0) {
      let updateData = { images: files, sliderId: editSlide._id }; //delateIndex:[0]
      updateSlider({
        variables: updateData,
        refetchQueries: [{ query: ALL_SLIDERS }],
      });
      setEditSlide({});
      document.getElementById("myUpdateForm").reset();
      setFiles([]);
    } else {
      console.log("no file");
    }
  };
  return (
    <div>
      {data &&
        data.sliders.map((s) => (
          <div className="sliderBody" key={s._id} onClick={() => handleEdit(s)}>
            {s.images.map((img, i) => (
              <img
                className="sliderImg"
                key={i}
                src={`http://localhost:5000/slider/${img}`}
              />
            ))}
          </div>
        ))}
      {editSlide._id && (
        <div className="fileInputContainer">
          <h1>Update Slide</h1>
          <form onSubmit={handleUpdate} id="myUpdateForm" className="inputForm">
            <div>
              {" "}
              {editSlide.images.map((img, index) => (
                <input
                  className="inputDiv"
                  key={index}
                  type="file"
                  onChange={(event) => handleChange(event, index)}
                />
              ))}
            </div>
            <button className="btn" type="submit">
              Upload
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateSlider;
