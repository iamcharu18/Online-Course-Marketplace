import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";

const register = () => {
    const [name, setName] = useState('Sobhan');
    const [email, setEmail] = useState('sobhan@gmail.com');
    const [password, setPassword] = useState('Sobhan');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            // console.table({ name, email, password })
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`, {
                name, email, password
            });
            // console.log("Register Response", data);
            toast.success("Registration Successful, Please continue to login")
            setLoading(false);
        } catch (err) {
            toast.error(err.response.data);
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="square">Register</h1>
            <div className="container text-center col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input type="text" className="form-control mb-3 p-2" value={name} onChange={e => setName(e.target.value)} placeholder="Enter Name" required />
                    <input type="email" className="form-control mb-3 p-2" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" required />
                    <input type="password" className="form-control mb-3 p-2" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" required />
                    <button type="submit" className="btn btn-primary col-6 col-lg-12 " disabled={!name || !email || !password || loading}>
                        {loading ? <SyncOutlined /> : "Submit"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default register;