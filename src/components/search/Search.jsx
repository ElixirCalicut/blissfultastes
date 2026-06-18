import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useState } from "react";



function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch("");
    window.location.reload();
  };

  return (
    <div className="m-2 ">
      <Form>
        <InputGroup>
        <input className="form-control bg-body-tertiary" type="Search" value={searchTerm}    placeholder="Search"
            onChange={handleInputChange}  aria-label="default input example"></input> 
           {searchTerm && (
            <Button
              variant="outline-secondary"
              className="close-button"
              onClick={handleClearSearch}
            >
              &times;
            </Button>
          )}
          {/* {searchTerm && (
            <Button variant="outline-secondary" onClick={handleClearSearch}>
              <img
                src="close-icon.png"
                alt="Close Icon"
                style={{ width: "20px", height: "20px" }}
              />
            </Button>
          )} */}

          {/* <Button variant="outline-success" onClick={()=>searchValue(searchTerm)}>Search</Button> */}
        </InputGroup>{" "}
      </Form>
    </div>
  );
}

export default Search;
