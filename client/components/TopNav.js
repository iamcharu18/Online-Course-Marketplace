import { useState, useEffect } from "react";
import { Menu } from "antd";
import Link from "next/link";
import { AppstoreOutlined, LoginOutlined, UserAddOutlined } from "@ant-design/icons";


// const { Item } = Menu;

// const TopNav = () => {
//     return (
//         <Menu mode="horizontal">
//             <Item icon={<AppstoreOutlined />}>
//                 <Link href="/">App</Link>
//             </Item>
//             <Item icon={<LoginOutlined />}>
//                 <Link href="/login">Login</Link>
//             </Item>
//             <Item icon={<UserAddOutlined />}>
//                 <Link href="/register">Register</Link>
//             </Item>
//         </Menu>
//     );
// };

const TopNav = () => {
    const [current, setCurrent] = useState("");

    useEffect(() => {
        typeof window !== 'undefined' && setCurrent(window.location.pathname)
        // console.log(window.location.pathname);
    }, [typeof window !== 'undefined' && window.location.pathname])

    const menuItems = [
        {
            key: '/',
            icon: <AppstoreOutlined />,
            label: <Link href="/">Home</Link>,
        },
        {
            key: '/login',
            icon: <LoginOutlined />,
            label: <Link href="/login">Login</Link>,
        },
        {
            key: '/register',
            icon: <UserAddOutlined />,
            label: <Link href="/register">Register</Link>,
        },
    ];

    const onClick = menuItems['onClick'] = (e) => {
        // console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <Menu onClick={onClick} selectedKeys={[current]} items={menuItems} mode="horizontal" />
    );
};

export default TopNav;