import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css"
import "antd/dist/reset.css"
import "../public/css/styles.css"
import TopNav from "../components/TopNav";
import "react-toastify/dist/ReactToastify.css";


function myApp({ Component, pageProps }) {
    return (
        <>
            {/* <ToastContainer position="top-center" /> */}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <TopNav />
            <Component {...pageProps} />
        </>
    );
};

export default myApp;