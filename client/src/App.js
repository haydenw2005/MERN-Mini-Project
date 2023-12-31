import {
  Dropdown,
  Space,
  Input,
  Divider,
  Typography,
  Pagination,
  Button,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, theme, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import SearchList from "./components/SearchList.component.js";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

//credits to https://ant.design/components/list for styling
function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [pageNum, setPageNum] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [message, setMessage] = useState("");
  const maxPageFetch = 50000;

  useEffect(() => {
    callSearch(1);
  }, []);

  const callSearch = async (page) => {
    setPageNum(page);
    setResponseData(null);

    const data = {
      'q_organization_domains': company,
      'page': page,
      'person_titles': [position],
    };
    
    axios
      .post("https://mern-person-finder.onrender.com/search", data)
      .then((res) => setResponseData(res.data));
    console.log(responseData);
  };

  const clearFields = () => {
    setPosition("");
    setCompany("");
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider>
        <div className="demo-logo-vertical" />
        <Title
          level={1}
          style={{
            color: "white",
            margin: "auto",
            padding: "15px",
          }}
        >
          Filters
        </Title>
        <div
          style={{
            margin: "auto",
            padding: "10px",
          }}
        >
          <Input
            onChange={(e) => setPosition(e.target.value)}
            value={position}
            placeholder="Search position"
            style={{ marginBottom: "12px" }}
          />
          <Input
            onChange={(e) => setCompany(e.target.value)}
            value={company}
            placeholder="Enter domain"
            style={{ marginBottom: "12px" }}
          />
          <Button
            onClick={() => callSearch(1)}
            type="primary"
            icon={<SearchOutlined />}
          >
            Search
          </Button>
          <Button
            onClick={clearFields}
            type="primary"
            danger
            style={{ left: "12px" }}
          >
            Clear
          </Button>
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 10,
            background: colorBgContainer,
          }}
        >
          <Title
            level={1}
            style={{
              color: "black",
              margin: "auto",
              padding: "",
            }}
          >
            Search People
          </Title>
        </Header>

        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          ></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {responseData ? (
              <SearchList data={responseData} />
            ) : (
              <Spin size="large" />
            )}
          </div>
          {responseData ? (
            <Pagination
              current={pageNum}
              onChange={(current) => callSearch(current)}
              total={
                responseData["pagination"]["total_pages"] > maxPageFetch
                  ? maxPageFetch
                  : responseData["pagination"]["total_pages"]
              }
              showQuickJumper
              showSizeChanger={false}
            />
          ) : null}
        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}
        ></Footer>
      </Layout>
    </Layout>
  );
}
export default App;
