import { gql } from "@apollo/client";
export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
      _id
    }
  }
`;

export const UPDATE_FILE = gql`
  mutation updateFile($file: Upload!, $fileId: ID!) {
    updateFile(updateInput: { file: $file, fileId: $fileId }) {
      url
      _id
    }
  }
`;

export const CREATE_SLIDER = gql`
  mutation createSlider($files: [Upload!]!) {
    createSlider(files: $files) {
      urls
      _id
    }
  }
`;
export const UPDATE_SLIDER = gql`
  mutation updateSlider(
    $images: [SliderFiles!]!
    $sliderId: ID!
    $delateIndex: [Int!]
  ) {
    updateSlider(
      updateSliderInput: {
        images: $images
        sliderId: $sliderId
        delateIndex: $delateIndex
      }
    ) {
      urls
      _id
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation createEvent(
    $title: String!
    $image: Upload!
  ) {
    createEvent(
      eventInput: {
        title: $title
        image:$image
      }
    ) {
      title
    }
  }
`;
