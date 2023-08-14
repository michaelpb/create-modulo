/*
    Use this file as a template to write your own custom Component Parts, such
    as code for a private API.

    GitHub's API is implemented as an example. Delete and replace with your own.
*/
modulo.register('cpart', class ExampleCustomCPart {
    initializedCallback(renderObj) {
        // Runs: Once, when the component is mounted on the page
        console.log('ExampleCustomCPart - Initailized callback!', this.conf);

        // EXAMPLE ----------
        this.retrievedData = [];
        window.fetch(`https://api.github.com/orgs/${ this.conf.exampleProperty }/repos`)
            .then(response => response.json())
            .then(responseData => {
                this.retrievedData = responseData; // Store data safely
                this.element.rerender(); // Force element to re-render
            });
    }

    prepareCallback(renderObj) {
        // Runs: Before each render

        // EXAMPLE ----------
        return {
            exampleData: this.retrievedData,
            exampleFunction: this.exampleFunction, // Expose exampleFunction to events
        };
    }

    renderCallback(renderObj) {
        // Runs: During each render
        // (Update allows to write custom renderers, e.g. instead of Template)
    }

    updateCallback(renderObj) {
        // Runs: After every render
        // (Update allows us to change something in the end, e.g. modifying DOM)
    }

    exampleFunction() {
        // Methods can be called by events
        alert('This code is in /static/cparts/ExampleCustomCPart.js');
    }
});
