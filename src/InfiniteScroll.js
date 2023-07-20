import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import _ from "lodash";
import { Spin } from "antd";
const InfiniteScrollComponent = () => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://backend.theprogrammer7.repl.co/${page}`
      );
      const newData = response.data.nodes;
      setData((prevData) => [...prevData, ...newData]);
      setPage((prevPage) => prevPage + 1);
      if (!newData) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container">
      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <div
            style={{
              marginBlock: 20
            }}
          >
            <Spin size="large" />
          </div>
        }
        endMessage={<p>No more items to load</p>}
      >
        {data.map((item) => (
          <div key={Math.random() * 10} className="child">
            <div>
              <img
                width="240px"
                height="auto"
                src={item.node.field_photo_image_section}
                alt={"img"}
                style={{
                  borderRadius: 10
                }}
              />
            </div>
            <div className="para_container">
              <p className="para">{item.node.title}</p>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollComponent;
