const wrapper = {
    wrapperWidth: window.innerWidth * 0.9,
    wrapperHeight: window.innerHeight * 0.9,
    margin: {
        top: 80,
        right: window.innerWidth * 0.1,
        bottom: 130,
        left: window.innerWidth * 0.1,
    },
};

const bounds = {
    width: wrapper.wrapperWidth - wrapper.margin.left - wrapper.margin.right,
    height: wrapper.wrapperHeight - wrapper.margin.top - wrapper.margin.bottom,
};

export { wrapper, bounds };
