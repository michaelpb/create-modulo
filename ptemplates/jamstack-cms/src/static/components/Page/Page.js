
function prepareCallback() {
    // Get the current year on every render of the page
    return {
        currentYear: (new Date()).getFullYear(),
    };
}

