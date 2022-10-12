import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8000/api/v1",
});

// export async function getRooms() {
//     // const response = await fetch(`${BASE_URL}/rooms/`);
//     // const json = await response.json();
//     // return json;
//     const response = await instance.get(`/rooms`);
//     return response.data;
// }

export const getRooms = () =>
    instance.get("/rooms").then((response) => response.data);
