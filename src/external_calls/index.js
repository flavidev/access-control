import API_KEYS from "../../credentials";
import { RNS3 } from "react-native-aws3";

let inputId = "";
let matchId = "";

export function uploadFaces(inputPhoto, matchPhoto) {
  const fileInputPhoto = {
    uri: inputPhoto,
    name: "inputPhoto.jpg",
    type: "image/jpg",
  };

  const fileMatchPhoto = {
    uri: matchPhoto,
    name: "matchPhoto.jpg",
    type: "image/jpg",
  };

  const options = {
    bucket: "access-control-cs50m-2020",
    region: "us-east-2",
    accessKey: API_KEYS.ACCESS,
    secretKey: API_KEYS.SECRET,
    successActionStatus: 201,
  };

  RNS3.put(fileInputPhoto, options).then((response) => {
    if (response.status !== 201)
      throw new Error("Failed to upload image to S3");
    //console.log(response.body.postResponse.location);
  });

  RNS3.put(fileMatchPhoto, options).then((response) => {
    if (response.status !== 201)
      throw new Error("Failed to upload image to S3");
    //console.log(response.body.postResponse.location);
  });
  setTimeout(() => {
    getUserKeys();
  }, 3000);
}

// Generating face ids inside Microsoft servers
export async function getUserKeys() {
  paths = {
    requestURL:
      "https://brazilsouth.api.cognitive.microsoft.com/face/v1.0/detect",
    input: "https://access-control-cs50m-2020.s3.amazonaws.com/inputPhoto.jpg",

    match: "https://access-control-cs50m-2020.s3.amazonaws.com/matchPhoto.jpg",
  };

  // Get input ID
  let responseInput = await fetch(paths.requestURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": API_KEYS.AZURE_KEY,
    },
    body: JSON.stringify({
      url: paths.input,
    }),
  });
  let responseJsonInput = await responseInput.json();
  inputId = responseJsonInput[0].faceId;

  // Get Match ID
  let responseMatch = await fetch(paths.requestURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": API_KEYS.AZURE_KEY,
    },
    body: JSON.stringify({
      url: paths.match,
    }),
  });
  let responseJsonMatch = await responseMatch.json();
  matchId = responseJsonMatch[0].faceId;

  setTimeout(() => {
    compareFaces();
  }, 2000);
}

async function compareFaces() {
  let requestURL =
    "https://brazilsouth.api.cognitive.microsoft.com/face/v1.0/verify";

  let response = await fetch(requestURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": API_KEYS.AZURE_KEY,
    },
    body: JSON.stringify({
      faceId1: inputId,
      faceId2: matchId,
    }),
  });

  let responseJson = await response.json();
  console.log(responseJson);
  return responseJson.isIdentical;
}
