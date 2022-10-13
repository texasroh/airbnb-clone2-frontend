import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

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

export const getMe = () =>
    instance.get("/users/me").then((response) => response.data);
