import * as d3 from "d3";

const date = {
  dateFormatter: d3.timeFormat("%m-%d-%y"),
  dateParser: d3.timeParse("%m-%d-%y"),
};

const dimensions = {
  width: window.innerWidth * 0.9,
  height: 800,
  margin: {
    top: 80,
    right: 80,
    bottom: 120,
    left: 80,
  },
};

const bounded = {
  width: dimensions.width - dimensions.margin.left - dimensions.margin.right,
  height: dimensions.height - dimensions.margin.top - dimensions.margin.bottom,
};

export { date, dimensions, bounded };
