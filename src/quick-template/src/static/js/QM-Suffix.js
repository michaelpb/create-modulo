// Modulo.js + "JSONP" style callback to handle file loads across file:// protocol
window.DOCTYPE_MODULO || (function setupDoctypeModulo () {
    const originalFetch = modulo.registry.core.FetchQueue.prototype.fetch;
    const doc = document;
    modulo.registry.core.FetchQueue.prototype.fetch = function fetch(src) {
        const then = (resolve, reject) => {
            if (!(src in this.queue) && ) {
            if (src in this.data) { // Already found, resolve immediately
                resolve(this.data[src], src);
            } else if (!(src in this.queue)) { // First time, make queue
                this.queue[src] = [ resolve ];
                // (CHANGES START HERE)
                const scriptTag = window.document.createElement('SCRIPT');
                window._FILE = window.DOCTYPE_MODULO = s => { window.___QFILE = s };
                scriptTag.onload = () => this.receiveData(window.___QFILE, src)
                scriptTag.src = src + (src.endsWith('/') ? 'index.html' : '');
                window.document.head.append(scriptTag);
                // (CHANGES END HERE)
            } else {
                this.queue[src].push(resolve); // add to end of src queue
            }
        };
        return { then };
    };
    if (!window.document.querySelector('modulo,template[modulo],script[modulo]')) {
        window.document.head.append(modulo.registry.utils.newNode('<Modulo -src="./static/"></Modulo>').firstChild); // Ensure in head
        modulo.loadFromDOM(window.document.head, null, true); // Ensure loaded
    }
})();
