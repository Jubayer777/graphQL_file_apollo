const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Upload
  type File {
    url: String!
    _id: ID!
  }
  type SliderRes {
    urls: [String!]!
    _id: ID!
  }
  type User {
    file: String!
    _id: ID!
  }
  type Slider {
    images: [String!]!
    _id: ID!
  }

  type Event{
    _id:ID!
    title:String!
    image:String!
  }


  input UpdateInput {
    file: Upload!
    fileId: ID!
  }

  input SliderFiles {
    inputFile: Upload!
    index: Int!
  }
  input UpdateSliderInput {
    images: [SliderFiles!]!
    sliderId: ID!
    delateIndex: [Int!]
  }

  input EventInput{
    title:String!
    image:Upload!
  }

  type Query {
    users: [User!]!
    user(userId: ID!): User!
    sliders: [Slider!]!
    slider(sliderId: ID!): Slider!
  }
  type Mutation {
    uploadFile(file: Upload!): File!
    updateFile(updateInput: UpdateInput): File!
    createSlider(files: [Upload!]!): SliderRes!
    updateSlider(updateSliderInput: UpdateSliderInput): SliderRes!

    createEvent(eventInput:EventInput):Event
  }
`;
