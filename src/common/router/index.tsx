import {createBrowserRouter} from "react-router-dom";
import App from "App"
import React from "react";
import MLogin from "view/market/MLogin";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path : "/market/login",
                element: <MLogin/>
            }
        ]

    },

]);

export default router;

