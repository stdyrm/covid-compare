    // const filterLockdown = e => {

    //     const revisedStates = {};

    //     if (e.target.id === "all-with-lockdown") {
    //         Object.keys(selectedStates).forEach(s => {
    //             revisedStates[s] = {
    //                 ...selectedStates[s],
    //                 selected:
    //                     selectedStates[s].lockdown < new Date() ? true : false,
    //             };
    //         });
    //     } else if (e.target.id === "all-without-lockdown") {
    //         Object.keys(selectedStates).forEach(s => {
    //             revisedStates[s] = {
    //                 ...selectedStates[s],
    //                 selected:
    //                     selectedStates[s].lockdown < new Date() ? false : true,
    //             };
    //         });
    //     }
    //     setSelectedStates(revisedStates);
    //     handleMenu();
    // };


// useEffect(() => {
// 	const revisedStates = {};

// 	if (lockdownRef.current) {
// 		console.log(lockdownRef.current.id);
// 		if (lockdownRef.current.id === "lockdown-before") {
// 			Object.keys(selectedStates).forEach(s => {
// 				revisedStates[s] = {
// 					...selectedStates[s],
// 					selected:
// 						selectedStates[s].lockdown < selectedDate
// 							? true
// 							: false,
// 				};
// 			});
// 		} else if (lockdownRef.current.id === "lockdown-after") {
// 			Object.keys(selectedStates).forEach(s => {
// 				revisedStates[s] = {
// 					...selectedStates[s],
// 					selected:
// 						selectedStates[s].lockdown > selectedDate
// 							? true
// 							: false,
// 				};
// 			});
// 		} else if (lockdownRef.current.id === "lockdown-end-before") {
// 			Object.keys(selectedStates).forEach(s => {
// 				revisedStates[s] = {
// 					...selectedStates[s],
// 					selected:
// 						selectedStates[s].lockdownEnd < selectedDate
// 							? true
// 							: false,
// 				};
// 			});
// 		} else if (lockdownRef.current.id === "lockdown-end-after") {
// 			Object.keys(selectedStates).forEach(s => {
// 				revisedStates[s] = {
// 					...selectedStates[s],
// 					selected:
// 						selectedStates[s].lockdownEnd > selectedDate
// 							? true
// 							: false,
// 				};
// 			});
// 		}
// 		setSelectedStates(revisedStates);
// 		handleMenu();
// 	}
// }, [selectedDate]);




{/* <Button
aria-controls="filter-lockdown-menu"
aria-haspopup="true"
id="filter-lockdown"
name="lockdown"
onMouseOver={handleMenu}
className={classes.tab}
>
Filter by Lockdown Date
</Button>
<Menu
id="filter-lockdown-menu"
anchorEl={anchorEl}
keepMounted
open={Boolean(selectedFilter === "lockdown")}
onClose={handleMenu}
MenuListProps={{ onMouseLeave: handleMenu }}
>
<Typography style={{ textAlign: "center" }}>
	Lockdown start
</Typography>
<Divider
	style={{
		backgroundColor: theme.palette.primary.contrastText,
		margin: 4,
	}}
/>
<MenuItem
	id="lockdown-before"
	ref={lockdownRef}
	className={classes.menuItem}
	onClick={e => (lockdownRef.current = e.currentTarget)}
>
	Before:
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
	className={classes.menuItem}
	onClick={e => (lockdownRef.current = e.currentTarget)}
>
	After:
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
<br />

<Typography style={{ textAlign: "center" }}>
	Lockdown End
</Typography>
<Divider
	style={{
		backgroundColor: theme.palette.primary.contrastText,
		margin: 4,
	}}
/>
<MenuItem
	id="lockdown-end-before"
	ref={lockdownRef}
	className={classes.menuItem}
	onClick={e => (lockdownRef.current = e.currentTarget)}
>
	Before:
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
	id="lockdown-end-after"
	ref={lockdownRef}
	className={classes.menuItem}
	onClick={e => (lockdownRef.current = e.currentTarget)}
>
	After:
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
</Menu> */}
