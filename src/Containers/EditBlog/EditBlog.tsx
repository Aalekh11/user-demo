import { Button } from "antd";
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../../App";

type responseType = {
  id: string;
  title: string;
  body: string;
  userId: string;
};

function EditBlog() {
  const location = useLocation();
  const value = useContext(ThemeContext);
  const [data, setData] = useState<responseType[]>([]);
  const [editable, setEditable] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    fetchData();
  }, [0]);

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/users/${value}/posts`)
      .then((res) => {
        if (res.data) {
          setData(res.data);
        }
      });
  };

  const handleEdit = () => {
    setEditable(!editable);
  };

  const cardItem: responseType[] | undefined = useMemo(() => {
    if (data && location.state.id) {
      const obj = data?.filter(
        (item: responseType) => item.id === location.state.id
      );
      return obj;
    }
  }, [data, location.state.id]);

  useEffect(() => {
    if (cardItem?.[0]) {
      setFormValues({ title: cardItem?.[0]?.title, body: cardItem?.[0]?.body });
    }
  }, [cardItem]);

  const handleChange = (e: any) => {
    setFormValues({ ...formValues, title: e.target.value });
  };

  const handleTextArea = (e: any) => {
    setFormValues({ ...formValues, body: e.target.value });
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
          backgroundColor: "white",
          borderRadius: "10px",
          height: "80%",
        }}
      >
        <div
          style={{
            marginTop: "50px",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div
            style={{
              fontSize: "30px",
              display: "flex",
              flexDirection: "row",
              gap: "20px",
            }}
          >
            <div>Title: </div>
            <div>
              {!editable ? (
                cardItem?.[0]?.title ?? "Empty"
              ) : (
                <input
                  style={{ width: "20rem", height: "100%" }}
                  defaultValue={cardItem?.[0]?.title}
                  value={formValues.title}
                  onChange={handleChange}
                />
              )}
            </div>
          </div>
          <div
            style={{
              fontSize: "30px",
              display: "flex",
              flexDirection: "row",
              gap: "20px",
            }}
          >
            <div>Body: </div>
            <div>
              {!editable ? (
                cardItem?.[0]?.body ?? "Empty"
              ) : (
                <textarea
                  style={{ width: "20rem", height: "10rem" }}
                  defaultValue={cardItem?.[0]?.body}
                  value={formValues.body}
                  onChange={handleTextArea}
                />
              )}
            </div>
          </div>

          <div
            style={{
              fontSize: "30px",
              display: "flex",
              flexDirection: "row",
              gap: "20px",
            }}
          >
            <Button type="primary" disabled={editable} onClick={handleEdit}>
              Edit
            </Button>
            <Button type="primary">Delete</Button>
            {editable && (
              <Button type="primary" onClick={handleEdit}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBlog;
