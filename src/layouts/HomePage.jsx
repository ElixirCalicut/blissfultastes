import { React, useState} from "react";
import Categories from "../features/categories/components/Categories";
import Banner from "../components/banner/Banner";
import Search from "../components/search/Search";

import { Container } from "react-bootstrap";

import "../styles/Custom.css"


function HomePage() {
  //search state
  const [searchTerm, setSearchTerm] = useState("");


  return (
    <Container fluid className="g-0 m-0 p-0 ">
      <Search onSearch={setSearchTerm} />
      <Banner />
      <Categories searchTerm={searchTerm} className="main-content"/>
    </Container>
  );
}

export default HomePage;
