import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import {
  IUploadImageVariables,
  IUploadRoomForm,
  IUsernameLoginVariables,
  ICreatePhotoVariables,
} from "./types";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

// export async function getRooms() {
//     // const response = await fetch(`${BASE_URL}/rooms/`);
//     // const json = await response.json();
//     // return json;
//     const response = await instance.get(`/rooms`);
//     return response.data;
// }

export const getRooms = () => {
  return instance.get("/rooms/").then((response) => response.data);
};

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return instance.get(`/rooms/${roomPk}`).then((response) => response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return instance
    .get(`/rooms/${roomPk}/reviews`)
    .then((response) => response.data);
};

export const getMe = () => {
  return instance.get("/users/me").then((response) => response.data);
};

export const logOut = () =>
  instance
    .post("/users/log-out", null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const githubLogIn = (code: string) =>
  instance
    .post(
      "/users/github",
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export const kakaoLogIn = (code: string) =>
  instance
    .post(
      "/users/kakao",
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export const usernameLogIn = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  instance
    .post(
      "/users/log-in",
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const getAmenities = () => {
  return instance.get("/rooms/amenities").then((response) => response.data);
};

export const getCategories = () => {
  return instance.get("/categories").then((response) => response.data);
};

export const uploadRoom = (variables: IUploadRoomForm) => {
  return instance
    .post("rooms/", variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const getUploadURL = () => {
  return instance
    .post(`medias/photos/get-url`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const uploadImage = ({ file, uploadURL }: IUploadImageVariables) => {
  const form = new FormData();
  form.append("file", file[0]);
  return axios
    .post(uploadURL, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

export const createPhoto = ({
  description,
  file,
  roomPk,
}: ICreatePhotoVariables) => {
  return instance
    .post(
      `rooms/${roomPk}/photos`,
      { description, file },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};
