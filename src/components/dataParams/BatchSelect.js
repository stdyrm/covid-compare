import React, { useState, useContext, useEffect, useRef } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";

// context
import { statesContext } from "../../context/statesContext";

// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  date: {
    backgroundColor: "#29293d",
    maxWidth: 100,
    paddingLeft: 10,
  },
});

const BatchSelect = () => {
  const { selectedStates, setSelectedStates } = useContext(statesContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedDate, setDateChange] = useState(new Date());
  const lockdownRef = useRef(null);
  const classes = useStyles();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setSelectedFilter(e.currentTarget.name);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedFilter(null);
  };

  const handleDateChange = (e) => {
    setDateChange(e);
  };

  const filterCases = (e) => {
    // top/bottom by total cases
    // top/bottom by cases per 1000 people
    const revisedStates = {};
    const revisedOrder = Object.keys(selectedStates).sort(
      (a, b) =>
        selectedStates[b].latestCaseCount - selectedStates[a].latestCaseCount
    );
    const revisedOrderToPopulation = Object.keys(selectedStates).sort(
      (a, b) =>
        selectedStates[b].latestCaseCount / selectedStates[b].population -
        selectedStates[a].latestCaseCount / selectedStates[a].population
    );

    if (e.target.id === "cases-top-12") {
      revisedOrder.forEach((s, i) => {
        revisedStates[s] = {
          ...selectedStates[s],
          selected: i < 12 ? true : false,
        };
      });
    } else if (e.target.id === "cases-bottom-12") {
      revisedOrder.reverse().forEach((s, i) => {
        revisedStates[s] = {
          ...selectedStates[s],
          selected: i < 12 ? true : false,
        };
      });
    } else if (e.target.id === "cases-top-12-per-1000") {
      revisedOrderToPopulation.forEach((s, i) => {
        revisedStates[s] = {
          ...selectedStates[s],
          selected: i < 12 ? true : false,
        };
      });
    } else if (e.target.id === "cases-bottom-12-per-1000") {
      revisedOrderToPopulation.reverse().forEach((s, i) => {
        revisedStates[s] = {
          ...selectedStates[s],
          selected: i < 12 ? true : false,
        };
      });
    }
    setSelectedStates(revisedStates);
    handleClose();
  };

  const filterLockdown = (e) => {
    // before/after x date
    // no current lockdown
    const revisedStates = {};

    if (e.target.id === "all-with-lockdown") {
      Object.keys(selectedStates).forEach((s) => {
        revisedStates[s] = {
          ...selectedStates[s],
          selected: selectedStates[s].lockdown < new Date() ? true : false,
        };
      });
    } else if (e.target.id === "all-without-lockdown") {
      Object.keys(selectedStates).forEach((s) => {
        revisedStates[s] = {
          ...selectedStates[s],
          selected: selectedStates[s].lockdown < new Date() ? false : true,
        };
      });
    }
    setSelectedStates(revisedStates);
    handleClose();
  };

  const filterPopulation = (e) => {
    // above/below x population
    const revisedStates = {};
    const revisedOrder = Object.keys(selectedStates).sort(
      (a, b) => selectedStates[b].population - selectedStates[a].population
    );

    if (e.target.id === "population-top-12") {
      revisedOrder.forEach((s, i) => {
        revisedStates[s] = {
          ...selectedStates[s],
          selected: i < 12 ? true : false,
        };
      });
    } else {
      revisedOrder.reverse().forEach((s, i) => {
        revisedStates[s] = {
          ...selectedStates[s],
          selected: i < 12 ? true : false,
        };
      });
    }
    setSelectedStates(revisedStates);
    handleClose();
  };

  const filterRegion = (e) => {
	const revisedStates = {};
	const filteredByRegion = Object.keys(selectedStates).filter(s => selectedStates[s].region === e.target.id);

	Object.keys(selectedStates).forEach(s => {
		if (filteredByRegion.includes(s)) {
			revisedStates[s] = {
				...selectedStates[s],
				selected: true
			};
		} else {
			revisedStates[s] = {
				...selectedStates[s],
				selected: false
			};
		}
	});

	setSelectedStates(revisedStates);
	handleClose();
  };

  useEffect(() => {
    const revisedStates = {};

    if (lockdownRef.current === "lockdown-before") {
      Object.keys(selectedStates).forEach((s) => {
        revisedStates[s] = {
          ...selectedStates[s],
          selected: selectedStates[s].lockdown < selectedDate ? true : false,
        };
      });
    } else if (lockdownRef.current === "lockdown-after") {
      Object.keys(selectedStates).forEach((s) => {
        revisedStates[s] = {
          ...selectedStates[s],
          selected: selectedStates[s].lockdown > selectedDate ? true : false,
        };
      });
    }
    setSelectedStates(revisedStates);
    handleClose();
  }, [selectedDate]);

  return (
    <>
      <Button id="filter-cases" name="cases" onClick={handleClick}>
        Filter by Case Counts
      </Button>
      <Menu
        id="filter-cases-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(selectedFilter === "cases")}
        onClose={handleClose}
      >
        <MenuItem id="cases-top-12" onClick={filterCases}>
          Highest 12 (total)
        </MenuItem>
        <MenuItem id="cases-bottom-12" onClick={filterCases}>
          Lowest 12 (total)
        </MenuItem>
        <MenuItem id="cases-top-12-per-1000" onClick={filterCases}>
          Highest 12 (per 1000)
        </MenuItem>
        <MenuItem id="cases-bottom-12-per-1000" onClick={filterCases}>
          Lowest 12 (per 1000)
        </MenuItem>
      </Menu>
      <Button id="filter-lockdown" name="lockdown" onClick={handleClick}>
        Filter by Lockdown Date
      </Button>
      <Menu
        id="filter-lockdown-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(selectedFilter === "lockdown")}
        onClose={handleClose}
      >
        <MenuItem id="all-with-lockdown" onClick={filterLockdown}>
          All with lockdown
        </MenuItem>
        <MenuItem id="all-without-lockdown" onClick={filterLockdown}>
          All without lockdown
        </MenuItem>
        <MenuItem
          id="lockdown-before"
          ref={lockdownRef}
          onClick={(e) => (lockdownRef.current = e.currentTarget.id)}
        >
          Lockdown before:
          <DatePicker
            variant="inline"
            disableToolbar
            autoOk
            value={selectedDate}
            onChange={handleDateChange}
            disableFuture={true}
            format="MM/dd/yyyy"
            className={classes.date}
          />
        </MenuItem>
        <MenuItem
          id="lockdown-after"
          ref={lockdownRef}
          onClick={(e) => (lockdownRef.current = e.currentTarget.id)}
        >
          Lockdown after:
          <DatePicker
            variant="inline"
            disableToolbar
            autoOk
            value={selectedDate}
            onChange={(date) => setDateChange(date)}
            disableFuture={true}
            format="MM/dd/yyyy"
            className={classes.date}
          />
        </MenuItem>
      </Menu>

      <Button id="filter-population" name="population" onClick={handleClick}>
        Filter by Total Population
      </Button>
      <Menu
        id="filter-population-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(selectedFilter === "population")}
        onClose={handleClose}
      >
        <MenuItem id="population-top-12" onClick={filterPopulation}>
          Highest 12
        </MenuItem>
        <MenuItem id="population-bottom-12" onClick={filterPopulation}>
          Lowest 12
        </MenuItem>
      </Menu>

      <Button id="filter-region" name="region" onClick={handleClick}>
        Filter by Region
      </Button>
      <Menu
        id="filter-region-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(selectedFilter === "region")}
        onClose={handleClose}
      >
        <MenuItem id="northeast" onClick={filterRegion}>
			Northeast
        </MenuItem>
		<MenuItem id="midwest" onClick={filterRegion}>
			Midwest
		</MenuItem>
		<MenuItem id="south" onClick={filterRegion}>
			South
		</MenuItem>
		<MenuItem id="west" onClick={filterRegion}>
			West
		</MenuItem>
      </Menu>
    </>
  );
};

export { BatchSelect };
