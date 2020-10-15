import React, { useState, useEffect } from "react";
import * as d3 from "d3";

// data
import COUNTY_DATA from "../../data/tl_2019_us_county_json.json";
import COUNTY_POP from "../../data/co-est2019-annres_csv.csv";

const AppCounty = () => {
  const [data, setData] = useState(null);
  const [refPop, setRefPop] = useState(null);

  const cleanData = async (landData, popData) => {
    let revData = [];
    let missingData = [];

    await landData.forEach(d => {
      d["areaSqMi"] = d["ALAND"] / 2589988; // from https://www.census.gov/quickfacts/fact/note/US/LND110210
      revData.push(d);
    });

    d3.csv(COUNTY_POP, d => {
      const areas = d["GeographicArea"].split(" County, ");

      d.County = `${areas[0].replace(".", "")} County`;
      d.State = areas[1];
      d.popEst2019 = parseInt(d["2019"].replace(",", ""));

      if (isNaN(d["popEst2019"])) {
        console.log(d);
      }

      // combine the two datasets
      // if (revData.filter(county => county["County"] === d["County"])) {
      // 	revData.filter(county => county["County"] === d["County"]).popDensity =
      // }
    });
  };

  useEffect(() => {
    cleanData(COUNTY_DATA, COUNTY_POP);

    // console.log(COUNTY_DATA.filter(d => d.STATEFP === "15"));

    // let revData = [];
    // COUNTY_DATA.forEach(d => {
    // 	d["areaSqMi"] = d["ALAND"] / 2589988 // from https://www.census.gov/quickfacts/fact/note/US/LND110210
    // });
    // setData(COUNTY_DATA);

    // d3.csv(COUNTY_POP, d => {
    // 	// return COUNTY_POP.filter(d => d["Geographic Area"].includes("Hawaii"));
    // 	// console.log(d);
    // 	if (d["GeographicArea"].endsWith("Hawaii")) {
    // 		console.log(d);
    // 	};

    // 	const areas = d["GeographicArea"].split(" County, ");

    // 	d["County"] = `${areas[0].replace(".", "")} County`;
    // 	d["State"] = areas[1];
    // 	d["popEst2019"] = parseInt(d["2019"].replace(",", ""));

    // 	if (isNaN(d["popEst2019"])) {
    // 		console.log(d);
    // 	}
    // 	return d;
    // }).then(res => setRefPop(res));
  }, []);

  useEffect(() => {
    if (!data) return;
    console.log(data.filter(d => d.STATEFP === "15"));
  }, [data]);

  useEffect(() => {
    if (!refPop) return;
    console.log(refPop);
  }, [refPop]);

  return <div></div>;
};

export default AppCounty;
