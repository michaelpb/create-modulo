// Modulo.js + "JSONP" style callback to handle file loads across file:// protocol
window.DOCTYPE_MODULO || (function setupDoctypeModulo (reg) {
    const originalFetch = reg.core.FetchQueue.prototype.fetch;
    const doc = document;
    reg.core.FetchQueue.prototype.fetch = function fetch(src) {
        if (src in this.data || src in this.queue) { // Already fetched or received
            return originalFetch(src); // Shortcut right away
        }
        const then = (resolve, reject) => { // Otherwise, 
            this.queue[src] = [ resolve ]; // Add self to queue
            const scriptTag = window.document.createElement('SCRIPT');
            window._FILE = window.DOCTYPE_MODULO = s => { window.___QFILE = s };
            scriptTag.onload = () => this.receiveData(window.___QFILE, src)
            scriptTag.src = src + (src.endsWith('/') ? 'index.html' : '');
            window.document.head.append(scriptTag);
        };
        return { then };
    };
    if (!doc.querySelector('modulo,template[modulo],script[modulo]')) {
        doc.head.append(reg.utils.newNode('<Modulo -src="./static/"></Modulo>').firstChild);
        modulo.loadFromDOM(doc.head, null, true); // Ensure loaded
    }
})(modulo.registry);
