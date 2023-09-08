import React, { useEffect, useContext, useCallback, useState } from "react";
import { MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { ThemeContext } from "../../App";

import type { MenuProps, MenuTheme } from "antd";
import { Menu, Switch } from "antd";
import styles from "../Sidebar/Sidebar.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

type ResponseData = {
  id: string;
  name: string;
  email: string;
  username: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
};

const items: MenuItem[] = [
  getItem("DOCUMENTATION", "sub2", null, [
    getItem("Option 7", "7"),
    getItem("Option 8", "8"),
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
  ]),
  getItem("REPORTS", "sub3", null, [
    getItem("Option 7", "7"),
    getItem("Option 8", "8"),
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
  ]),
  getItem("NEED HELP?", "sub4", null, [
    getItem("Option 7", "7"),
    getItem("Option 8", "8"),
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
  ]),
];

type LISTTYPE = {
  parent: string;
  child: {
    title: string;
    route: string;
  }[];
};

function Sidebar() {
  const value = useContext(ThemeContext);
  const [data, setData] = useState<ResponseData | null>(null);

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/users/${value}`)
      .then((res) => {
        if (res.data) {
          setData(res.data);
        }
      });
  };

  const list: LISTTYPE[] = [
    {
      parent: "Dashboard",
      child: [
        { title: "OverView", route: "/dashboard" },
        { title: "Calender", route: "/dashboard" },
        { title: "Schedule Actions", route: "/dashboard" },
        { title: "Live Alerts", route: "/dashboard" },
      ],
    },
    {
      parent: "Blogs",
      child: [
        { title: "All", route: "/blogs" },
        { title: "Latest", route: "/blogs" },
        { title: "Archived", route: "/blogs" },
      ],
    },
  ];

  return (
    <div style={{ width: "300px", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#2a6ce8",
        }}
      >
        <div style={{ fontSize: "30px", color: "white", padding: "10px" }}>
          QDB
        </div>
        <div style={{ padding: "10px" }}>
          <MenuUnfoldOutlined style={{ color: "white", fontSize: "30px" }} />
        </div>
      </div>
      <div className={styles?.avatar}>
        <Avatar size={64} icon={<UserOutlined />} />

        <div className={styles?.username}>{data?.name}</div>
        <Button type="primary" className={styles?.metrics_button}>
          Live Metrics
        </Button>
      </div>
      <>
        {list.map((item) => {
          return (
            <>
              <div
                style={{
                  fontWeight: "bold",
                  padding: "10px",
                  marginTop: "25px",
                  margin:"14px"
                }}
              >
                {item.parent}
              </div>
              <ul className={styles?.listWrapper}>
                {item.child.map((value) => {
                  return (
                    <Link to={value.route} style={{ textDecoration: "none" }}>
                      <div className={styles?.itemWrapper}>
                        <li className={styles?.item}>{value.title}</li>
                      </div>
                    </Link>
                  );
                })}
              </ul>
            </>
          );
        })}
      </>
      <>
        <Menu
          style={{ width: 300, fontSize: "15px", fontWeight: "bold" }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          items={items}
          mode="inline"
        />
      </>
    </div>
  );
}

export default Sidebar;
