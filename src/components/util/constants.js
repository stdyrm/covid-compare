import * as d3 from "d3";

const date = {
  dateFormatter: d3.timeFormat("%m-%d-%y"),
  dateParser: d3.timeParse("%m-%d-%y"),
};

const dimensions = {
  width: window.innerWidth,
  height: 750,
  margin: {
    top: 80,
    right: 100,
    bottom: 120,
    left: 100,
  },
};

const bounded = {
  width: dimensions.width - dimensions.margin.left - dimensions.margin.right,
  height: dimensions.height - dimensions.margin.top - dimensions.margin.bottom,
};

export { date, dimensions, bounded };
