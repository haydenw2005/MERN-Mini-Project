import React, { useState } from "react";
import { Avatar, List, Spin } from "antd";
import Search from "antd/es/input/Search";

//credits to https://ant.design/components/list for styling

const checkImage = (url) => {};

function SearchList(props) {
  return (
    <div>
      {props.data ? (
        <List
          itemLayout="horizontal"
          dataSource={props.data["people"]}
          renderItem={(item, index) => (
            <List.Item style={{ height: "90px" }}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{ border: "4px solid #000", marginTop: 15 }}
                    size={60}
                    src={item["photo_url"]}
                  />
                }
                title={
                  <div>
                    <a
                      href={item["linkedin_url"]}
                      style={{ display: "inline-block", marginRight: "5px" }}
                    >
                      {item["name"] ? item["name"] : null}
                    </a>
                    {item["city"] ? (
                      <p style={{ display: "inline-block" }}>
                        - {item["city"]}, {item["country"]}
                      </p>
                    ) : (
                      <p style={{ display: "inline-block" }}>
                        - {item["country"]}
                      </p>
                    )}
                  </div>
                }
                description={
                  <p style={{ position: "relative", top: "-15px" }}>
                    {item["title"]} at {item["organization"]["name"]}
                  </p>
                }
              />
            </List.Item>
          )}
        />
      ) : (
        <Spin size="large" />
      )}
    </div>
  );
}

export default SearchList;
