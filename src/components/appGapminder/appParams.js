export const chartParams = {
    chartType: "bubble",
    toTimestamp: null,
    multiple: true,
    normalize: true,
    xParam: {
        // x-axis
        output: "x-axis",
        type: "linear",
        format: "none",
        selected: "casesPerThousand",
        alt1: "cases",
        options: ["casesPerThousand", "cases", "deathsPerThousand", "deaths"],
    },
    yParam: {
        // y-axis
        output: "y-axis",
        type: "linear",
        format: "none",
        selected: "deathsPerThousand",
        alt1: "deaths",
        options: ["casesPerThousand", "cases", "deathsPerThousand", "deaths"],
    },
    zParam: {
        // z-axis (3rd dimension) (eg. size)
        output: "circle-area",
        type: "linear",
        format: "none",
        selected: "population",
        options: ["population", "populationDensity", "gdp", "none"],
    },
    cParam: {
        // color axis (categorical/ordinal data) (eg. gender, birthplace, etc.)
        output: "color-grouping",
        type: "categorical",
        selected: "region",
        options: ["region", "division", "governor"],
    },
    tParam: {
        // time axis (4th dimension) (ie. for animated charts)
        output: "time",
        type: "time",
        selected: "dayOfOutbreak",
        options: ["dayOfOutbreak", "date"],
    },
};

// Label params:
export const labelParams = {
    chartTitle: "COVID-19 State Comparison",
    xLabel: "Cases per Thousand",
    yLabel: "Deaths per Thousand",
};

// color param categories
export const cParamCategories = {
    region: ["Northeast", "Midwest", "South", "West"],
    division: [
        "New England",
        "Mid-Atlantic",
        "East North Central",
        "West North Central",
        "South Atlantic",
        "East South Central",
        "West South Central",
        "Mountain",
        "Pacific",
    ],
    governor: ["Republican", "Democrat", "n/a"],
};
