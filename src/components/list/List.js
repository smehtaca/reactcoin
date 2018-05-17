import React from "react";

import { handleResponse } from "../../helpers";
import { API_URL } from "../../config";
import "./Table.css";
import Loading from "../common/Loading";
import Table from "./Table";
import Pagination from "./Pagination";

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      currencies: [],
      error: null,
      totalPages: 0,
      page: 1
    };
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies() {
    const { page } = this.state;

    this.setState({ loading: true });

    fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
      .then(handleResponse)
      .then(data => {
        const { currencies, totalPages } = data;
        this.setState({
          currencies,
          totalPages,
          loading: false
        });
      })
      .catch(error => {
        this.setState({ error: error.errorMessage, loading: false });
      });
  }

  handlePaginationClick(direction) {
    let nextPage = this.state.page;

    nextPage = direction === "next" ? nextPage + 1 : nextPage - 1;

    this.setState({ page: nextPage }, () => {
      this.fetchCurrencies();
    });
  }

  render() {
    const { loading, error, currencies, page, totalPages } = this.state;
    if (loading) {
      return <div className="error">{error}</div>;
    }

    if (error) {
      return (
        <div className="Loading-container">
          <Loading />
        </div>
      );
    }

    return (
      <div>
        <Table currencies={currencies} />
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePaginationClick={this.handlePaginationClick}
        />
      </div>
    );
  }
}

export default List;
