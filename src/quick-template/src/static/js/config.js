
//
// The Modulo Quick Pages Configuration File

// Note: You will likely not need to change anything here. However, certain
// configuration of the Modulo Quick Pages system is available here.

// Added to the "bottom" of every "quick files" page:
modulo.config.QUICK_FILES_ENTRY_POINT = '<script Modulo -src="./static/"></script>';

/* <!-- BOILERPLATE: DO NOT EDIT BELOW HERE --> */
// "JSONP" style callback to handle file loads across file:// protocol
window._FILE = content => {
    window._LAST_FILE_CONTENT = content;
};
modulo.register('core', class QuickFileFetchQueue extends modulo.registry.core.FetchQueue {
    fetch(src) { // Returns "thennable" that resembles window.fetch
        // (CHANGES START HERE)
        if (src.endsWith('/')) {
            src = src + 'index.html'; // Add in default 'index.html'
        }
        // (CHANGES END HERE)

        const then = (resolve, reject) => {
            if (src in this.data) { // Already found, resolve immediately
                resolve(this.data[src], src);
            } else if (!(src in this.queue)) { // First time, make queue
                this.queue[src] = [ resolve ];

                // (CHANGES START HERE)
                const scriptTag = window.document.createElement('SCRIPT');
                scriptTag.onload = () => {
                    this.receiveData(window._LAST_FILE_CONTENT, src);
                    delete window._LAST_FILE_CONTENT; // Ensure consumed
                };
                scriptTag.src = src;
                window.document.head.append(scriptTag);
                // (CHANGES END HERE)

            } else {
                this.queue[src].push(resolve); // add to end of src queue
            }
        };
        return { then };
    }
}, { name: 'FetchQueue' }); // Override default fetch queue
modulo.fetchQueue = new modulo.registry.core.QuickFileFetchQueue(modulo); // Ensure instantiated as new one
if (!window.document.querySelector('modulo,template[modulo],script[modulo]')) {
    const qfep = modulo.registry.utils.newNode(modulo.config.QUICK_FILES_ENTRY_POINT);
    window.document.head.append(qfep.firstChild); // Ensure in body before DOMContentLoaded
    modulo.loadFromDOM(window.document.head, null, true); // Blocking load
}
