function internalFunc(value) {
    return value;
}

export const pageFunc = function (value) {
    alert(`invoked page func with value: ${internalFunc(value)}`);
};
