export const wrapper = {
	wrapperWidth: window.innerWidth * .8,
	wrapperHeight: window.innerHeight * .8,
	margin: { 
		top: 80,
		right: 40,
		bottom: 60,
		left: 60
	}
  };
  
export const bounds = {
	width: wrapper.wrapperWidth - wrapper.margin.left - wrapper.margin.right,
	height: wrapper.wrapperHeight - wrapper.margin.top - wrapper.margin.bottom,
};