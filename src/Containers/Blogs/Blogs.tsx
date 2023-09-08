import React, { ReactNode, useState } from "react";
import { Button, Tabs } from "antd";
import type { TabsProps } from "antd";
import CardItems from "../../Components/Card/CardItems";

function Blogs() {
  const [content, setContent] = useState<ReactNode>("All Blogs Post");

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "All Post",
      children: <CardItems />,
    },
    {
      key: "2",
      label: "Latest Post",
      children: <CardItems />,
    },
    {
      key: "3",
      label: "Archived",
      children: "Content of Tab Pane 3",
    },
  ];

  const onChange = (key: string) => {
    const obj = items?.filter((item) => item.key === key)[0].label;
    setContent(obj);
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#e1e3e6",
        paddingTop: "20px",
      }}
    >
      <div
        style={{
          margin: "30px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{ fontSize: "25px" }}>{content}</div>
          <div style={{ color: "#525050" }}>Qatar Development Bank</div>
        </div>
        <Button>Filter/Sort By</Button>
      </div>
      <div
        style={{
          margin: "30px",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <div style={{ margin: "30px" }}>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

export default Blogs;
