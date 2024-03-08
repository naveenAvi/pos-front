export function updateState(setState, prevVals, ID, newVal) {
    const updatedCategories = prevVals.map((category) =>
        category.id === ID ? newVal : category
    );
    setState(updatedCategories)
}