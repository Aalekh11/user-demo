import { Pagination } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../App";
import Card from "./Card";

function CardItems() {
  const navigate = useNavigate();
  const value = useContext(ThemeContext);
  const [responseData, setResponseData] = useState([]);
  const numEachPage = 3;
  const [pagination, setPagination] = useState({
    minValue: 0,
    maxValue: 3,
  });

  const handleChange = (value: any) => {
    setPagination({
      minValue: (value - 1) * numEachPage,
      maxValue: value * numEachPage,
    });
  };

  useEffect(() => {
    fetchData();
  },[0]);

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/users/${value}/posts`)
      .then((res) => {
        if (res.data) {
          setResponseData(res.data);
        }
      });
  };

  const handleClick = (item: any) => {
    console.log(item.id)
    navigate("/editblog", { state: { id: item?.id } });
  };

  return (
    <>
      <div style={{}}>
        {responseData
          .slice(pagination.minValue, pagination.maxValue)
          .map((item) => {
            return (
              <div onClick={() => handleClick(item)}>
                <Card item={item} />
              </div>
            );
          })}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "15px" }}
      >
        <Pagination
          defaultCurrent={1}
          defaultPageSize={numEachPage}
          pageSize={3}
          total={responseData.length}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default CardItems;
