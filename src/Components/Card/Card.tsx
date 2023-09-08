import React, { useState } from "react";
import styles from "../Card/Card.module.css";

function Card({item}:any) {
  const [readMore, setReadMore] = useState<boolean>(false);
  const [id, setId] = useState();
  return (
    <>
          <div key={item.id} className={styles?.card}>
            <div className={styles?.card__image}>
              <img src="logo192.png" />
            </div>
            <div className={styles?.card__copy}>
              <h2>{item.title}</h2>

              <p>
                {readMore && id === item.id
                  ? item.body
                  : item.body.substring(0, 100)}
              </p>
              <a
                onClick={() => {
                  setId(item.id);
                  setReadMore(!readMore);
                }}
                className={styles.readmore}
              >
                read more
              </a>
            </div>
          </div>
    </>
  );
}

export default Card;
