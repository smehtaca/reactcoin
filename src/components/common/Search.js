import React from "react";
import Loading from "../common/Loading";
import { API_URL } from "../../config";
import { handleResponse } from "../../helpers";
import "./Search.css";

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: "",
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const searchQuery = event.target.value;

    this.setState({ loading: true });

    // If searcyQuery is empty, no ajax call
    if (!searchQuery) {
      return "";
    }

    fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
      .then(handleResponse)
      .then(result => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="Search">
        <span className="Search-icon" />
        <input
          className="Search-input"
          type="text"
          placeholder="Currency Name"
          onChange={this.handleChange}
        />
        {loading && (
          <div className="Search-loading">
            <Loading width="12px" height="12px" />
          </div>
        )}
      </div>
    );
  }
}

export default Search;
