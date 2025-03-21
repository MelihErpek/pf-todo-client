import React, { useEffect, useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import axios from "axios";
import { EditOutlined, SearchOutlined, CheckOutlined } from "@ant-design/icons";
import { Card, Pagination, Input } from "antd";
import { useHistory } from "react-router-dom";
<CheckOutlined />;
const { Meta } = Card;

const App = () => {
  const { userData } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3);
  const history = useHistory();

  useEffect(() => {
    if (userData.user) {
      if (userData.user.user) {
        let id = userData.user.user._id;
        axios.post("https://pf-todo-api.vercel.app/getitems", { id }).then((json) => {
          setItems(json.data);
          setFilteredItems(json.data);
        });
      }
    }
  }, [userData]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) =>
        item.headline.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
      setCurrentPage(1);
    }
  }, [searchTerm, items]);

  const success = async (id) => {
    await axios.post("https://pf-todo-api.vercel.app/deleteitem", { id });
    history.push("/yourtodo");
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filteredItems.slice(startIndex, startIndex + pageSize);

  return (
    <div className="sm:flex flex-col justify-center items-center">
      <div className="mb-4 w-80">
        <Input
          placeholder="Search By A Title"
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="sm:flex justify-center sm:space-x-6 space-x-0 sm:ml-0 ml-5 flex-wrap">
        {currentData.length > 0 ? (
          currentData.map((item) => (
            <Card
              key={item._id}
              className="w-80 mb-4"
              cover={<img  className="h-56"alt="example" src={item.image} />}
              actions={[
                <EditOutlined
                  key="edit"
                  onClick={() => history.push("/edit/" + item._id)}
                />,
                <CheckOutlined
                  key="success"
                  onClick={() => success(item._id)}
                />,
              ]}
            >
              <Meta title={item.headline} description={item.description} />
              <div className="mt-4 text-center font-semibold text-blue-500 border-b-4">AI Suggestion</div>
              <div className="mt-4">{item.chatGPT}</div>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-center">There is no ToDo item.</p>
        )}
      </div>

      {filteredItems.length > pageSize && (
        <Pagination
          current={currentPage}
          total={filteredItems.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
          className="mt-4"
        />
      )}
    </div>
  );
};

export default App;
