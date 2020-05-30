export const wrapper = {
	wrapperWidth: window.innerWidth * .9,
	wrapperHeight: window.innerHeight * .9,
	margin: { 
		top: 80,
		right: window.innerWidth * .1,
		bottom: 130,
		left: window.innerWidth * .1
	}
  };
  
export const bounds = {
	width: wrapper.wrapperWidth - wrapper.margin.left - wrapper.margin.right,
	height: wrapper.wrapperHeight - wrapper.margin.top - wrapper.margin.bottom,
};