import React, { useEffect } from 'react';
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

export const ResponsiveDesign = (props) => {
	const { wrapperDim, setWrapperDim, setBoundedDim } = props;

	const theme = useTheme();
	const mqSmall = useMediaQuery(theme.breakpoints.up("sm"));
	const mqMedium = useMediaQuery(theme.breakpoints.up("md"));
	  
	const dimensions = {
		wrapperWidth: mqMedium ? window.innerWidth * .8 : window.innerWidth * .9,
		wrapperHeight: window.innerHeight * .9,
		marginTop: 60,
		marginRight: 20,
		marginBottom: 130,
		marginLeft: 80,
	};

	useEffect(() => {
		setWrapperDim(dimensions);
	}, []);

	useEffect(() => {
		setBoundedDim({
			width: dimensions.wrapperWidth - dimensions.marginLeft - dimensions.marginRight,
			height: dimensions.wrapperHeight - dimensions.marginTop - dimensions.marginBottom,
		});
	}, [wrapperDim]);

	return null;
};
