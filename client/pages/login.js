import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";

const login = () => {
    const [email, setEmail] = useState('sobhan@gmail.com');
    const [password, setPassword] = useState('Sobhan');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(`/api/login`, {
                email, password
            });
            // console.log("Login Response", data);
            toast.success("Login Successful")
            setLoading(false);
        } catch (err) {
            toast.error(err.response.data);
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="square">Login</h1>
            <div className="container text-center col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input type="email" className="form-control mb-3 p-2" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" required />
                    <input type="password" className="form-control mb-3 p-2" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" required />
                    <button type="submit" className="btn btn-primary col-6 col-lg-12 " disabled={!email || !password || loading}>
                        {loading ? <SyncOutlined /> : "Submit"}
                    </button>
                </form>
                <p className="text-center p-3">
                    Not yet registered?
                    <Link href="/register">Registered</Link>
                </p>
            </div>
        </>
    );
};

export default login;