import React from "react";
import { withRouter } from "react-router-dom";
import Loading from "../common/Loading";
import { API_URL } from "../../config";
import { handleResponse } from "../../helpers";
import "./Search.css";

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchResults: [],
      searchQuery: "",
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleChange(event) {
    const searchQuery = event.target.value;

    this.setState({ searchQuery, loading: true });

    // If searcyQuery is empty, no ajax call
    if (!searchQuery) {
      return "";
    }

    fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
      .then(handleResponse)
      .then(result => {
        this.setState({ searchResults: result, loading: false });
      });
  }

  handleRedirect(currencyId) {
    //Clear input and results
    this.setState({ searchQuery: "", searchResults: [] });
    this.props.history.push(`/currency/${currencyId}`);
  }

  renderSearchResults() {
    const { searchResults, searchQuery, loading } = this.state;

    if (!searchQuery) return "";

    if (searchResults.length > 0) {
      return (
        <div className="Search-result-container">
          {searchResults.map(result => (
            <div
              className="Search-result"
              key={result.id}
              onClick={() => this.handleRedirect(result.id)}
            >
              {result.name} ({result.symbol})
            </div>
          ))}
        </div>
      );
    }
    if (!loading) {
      return (
        <div className="Search-result-container">
          <div className="Search-no-result">No Results Found!</div>
        </div>
      );
    }
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
        {this.renderSearchResults()}
      </div>
    );
  }
}

export default withRouter(Search);
