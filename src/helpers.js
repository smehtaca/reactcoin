import React from "react";
/*
 Fetch error handler

 @param{object} response
*/

export const handleResponse = response => {
  return response.json().then(json => {
    return response.ok ? json : Promise.reject(json);
  });
};
const renderChangePercent = percent => {
  if (percent > 0) {
    return <span className="Percent-raised">{percent}% &uarr;</span>;
  } else if (percent < 0) {
    return <span className="Percent-fallen">{percent}% &darr;</span>;
  } else {
    return <span>{percent}%</span>;
  }
};

export default renderChangePercent;
