import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import GithubConfirm from "./routes/GithubConfirm";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import RoomDetail from "./routes/RoomDetail";

const router = createBrowserRouter([
    {
        path: "",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "rooms/:roomPk",
                element: <RoomDetail />,
            },
            {
                path: "social",
                errorElement: <NotFound />,
                children: [
                    { path: "github", element: <GithubConfirm /> },
                    { path: "kakao" },
                ],
            },
        ],
    },
]);

export default router;
