import React, { useState, useContext, useEffect, useRef } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";

// context
import { statesContext } from "../../context/statesContext";
import { themeContext } from "../../context/themeContext";

// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  tab: {
    opacity: 0.7,
  },
  menuItem: {
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
}));

export const BatchSelect = () => {
  const { selectedStates, setSelectedStates } = useContext(statesContext);
  const { theme } = useContext(themeContext);
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

  const casesOptions = [
	{id: "cases-top-12", name: "Highest 12 (total)"},
	{id: "cases-bottom-12", name: "Lowest 12 (total"},
	{id: "cases-top-12-per-1000", name: "Highest 12 (per 1000)"},
	{id: "cases-bottom-12-per-1000", name: "Lowest 12 (per 1000)"}
  ];

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
    const filteredByRegion = Object.keys(selectedStates).filter(
      (s) => selectedStates[s].region === e.target.id
    );

    Object.keys(selectedStates).forEach((s) => {
      if (filteredByRegion.includes(s)) {
        revisedStates[s] = {
          ...selectedStates[s],
          selected: true,
        };
      } else {
        revisedStates[s] = {
          ...selectedStates[s],
          selected: false,
        };
      }
    });

    setSelectedStates(revisedStates);
    handleClose();
  };

	const regionOptions = [
		{id: "northeast", name: "Northeast"},
		{id: "midwest", name: "Midwest"},
		{id: "south", name: "South"},
		{id: "west", name: "West"}
	];

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
    <span>
      <Button
		  aria-controls="filter-cases-menu"
		  aria-haspopup="true"
		  id="filter-cases"
		  name="cases"
		  onMouseOver={handleClick}
		  className={classes.tab}
      >
        Filter by Case Counts
      </Button>
      <Menu
        id="filter-cases-menu"
        anchorEl={anchorEl}
        keepMounted
		open={Boolean(selectedFilter === "cases")}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
      >
		  {casesOptions.map((c,i) => {
			  return (
					<MenuItem
						key={i}
						id={c.id}
						onClick={filterCases}
						className={classes.menuItem}				
					>
				  		{c.name}
				  	</MenuItem>
			  )
		  })}
      </Menu>
	  
      <Button
		aria-controls="filter-lockdown-menu"
		aria-haspopup="true"
        id="filter-lockdown"
        name="lockdown"
        onMouseOver={handleClick}
        className={classes.tab}
      >
        Filter by Lockdown Date
      </Button>
      <Menu
        id="filter-lockdown-menu"
        anchorEl={anchorEl}
        keepMounted
		open={Boolean(selectedFilter === "lockdown")}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
      >
        <MenuItem
          id="all-with-lockdown"
          onClick={filterLockdown}
          className={classes.menuItem}
        >
          All with lockdown
        </MenuItem>
        <MenuItem
          id="all-without-lockdown"
          onClick={filterLockdown}
          className={classes.menuItem}
        >
          All without lockdown
        </MenuItem>
        <MenuItem
          id="lockdown-before"
          ref={lockdownRef}
          onClick={(e) => (lockdownRef.current = e.currentTarget.id)}
          className={classes.menuItem}
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
          />
        </MenuItem>
        <MenuItem
          id="lockdown-after"
          ref={lockdownRef}
          onClick={(e) => (lockdownRef.current = e.currentTarget.id)}
          className={classes.menuItem}
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
          />
        </MenuItem>
      </Menu>

      <Button
        id="filter-population"
        name="population"
        onMouseOver={handleClick}
        className={classes.tab}
      >
        Filter by Total Population
      </Button>
      <Menu
        id="filter-population-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(selectedFilter === "population")}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
      >
        <MenuItem
          id="population-top-12"
          onClick={filterPopulation}
          className={classes.menuItem}
        >
          Highest 12
        </MenuItem>
        <MenuItem
          id="population-bottom-12"
          onClick={filterPopulation}
          className={classes.menuItem}
        >
          Lowest 12
        </MenuItem>
      </Menu>

      <Button
        id="filter-region"
        name="region"
        onMouseOver={handleClick}
        className={classes.tab}
      >
        Filter by Region
      </Button>
      <Menu
        id="filter-region-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(selectedFilter === "region")}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
      >
		  {regionOptions.map((r,i) => {
			  return (
				  	<MenuItem
						key={i}					
						id={r.id}
						onClick={filterRegion}
						className={classes.menuItem}
					>
						{r.name}
				  	</MenuItem>
			  );
		  })
		  }
      </Menu>
    </span>
  );
};
