import React from "react";
import { Layout, Input, Button } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar} from "antd";

const { Header } = Layout;

const { Search } = Input;

function HeaderComponent() {
  return (
    <Header
      style={{
        padding: 0,
        background: "white",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: "300px", marginLeft: "15px", display: "flex" }}>
        <Search placeholder="Type here to search" />
      </div>
      <div
        style={{
          display: "flex",
          gap: "5px",
          flexDirection: "row",
          marginRight: "15px",
        }}
      >
        <Button type="text">+ Add</Button>
        <Avatar size="large" icon={<UserOutlined />} />
        <DownOutlined/>
      </div>
    </Header>
  );
}

export default HeaderComponent;
