import API_KEYS from "../../credentials";
import { RNS3 } from "react-native-aws3";

export async function uploadFaces(inputPhoto, matchPhoto) {
  let inputId = "";
  let matchId = "";

  const fileInputPhoto = {
    uri: inputPhoto,
    name: `inputPhoto${Math.floor(Math.random() * 1000000000000).toString()}.jpg`,
    type: "image/jpg",
  };

  const fileMatchPhoto = {
    uri: matchPhoto,
    name: `matchPhoto${Math.floor(Math.random() * 1000000000000).toString()}.jpg`,
    type: "image/jpg",
  };

  const options = {
    bucket: "access-control-cs50m-2020",
    region: "us-east-2",
    accessKey: API_KEYS.ACCESS,
    secretKey: API_KEYS.SECRET,
    successActionStatus: 201,
  };

  const uploadInput = await RNS3.put(fileInputPhoto, options).then(
    (response) => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      console.log(response.body.postResponse.location);
    }
  );

  const uploadMatch = await RNS3.put(fileMatchPhoto, options).then(
    (response) => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      console.log(response.body.postResponse.location);
    }
  );

  paths = {
    requestURL:
      "https://brazilsouth.api.cognitive.microsoft.com/face/v1.0/detect",
    input: `https://access-control-cs50m-2020.s3.amazonaws.com/${fileInputPhoto.name}`,

    match: `https://access-control-cs50m-2020.s3.amazonaws.com/${fileMatchPhoto.name}`,
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
