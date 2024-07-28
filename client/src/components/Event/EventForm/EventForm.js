import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_EVENT, UPDATE_EVENT } from "../../../GraphQL/Mutation";
import { allEvents } from "../../../GraphQL/Query";

const EventForm = () => {
  const [inputData, setInputData] = useState({
    title: "",
    image:''
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setInputData({
        ...inputData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setInputData({
        ...inputData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const [createEvent] = useMutation(CREATE_EVENT, {
    onCompleted: (data) => {

    },
    onError: (errors) => {
      if (errors.message) {
        alert(errors.message);
        setInputData({
          title: "",
          image: ""
        });
        document.getElementById("myForm").reset();
      }
    },
  });
  const addEvent = (e) => {
    e.preventDefault();
    const isNonEmpty = !Object.values(inputData).some(
      (x) => x === null || x === ""
    );
    if (isNonEmpty) {
      createEvent({
        variables: inputData,
        // refetchQueries: [{ query: allEvents }],
      });
    } else {
      alert("filed empty");
    }
  };


  return (
    <div className="createBody">
      <form onSubmit={addEvent} id="myForm">
        <div className="inputSection">
          <label className="inputLabel">Title</label>
          <input
            className="inputField"
            type="text"
            name="title"
            onInput={handleChange}
          />
        </div>
        <div className="inputSection">
          <label className="inputLabel">Image</label>
          <input
            className="inputField"
            type="file"
            name="image"
            onInput={handleChange}
          />
        </div>
        <button className="btn" type="submit">
           Add
        </button>
      </form>
    </div>
  );
};

export default EventForm;
