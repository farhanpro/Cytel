import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Cities from "./Cities";
import Products from "./Products";

const Body = () =>{
    const appRouter = createBrowserRouter([
        {
            path:"/",
            element:<Browse/>
        },
        {
            path:"/cities",
            element:<Cities/>
        },
        {
            path:"/products",
            element:<Products/>
        }
    ]);
    return(
        <div>
        <RouterProvider router={appRouter}/>
        </div>)
}

export default Body;