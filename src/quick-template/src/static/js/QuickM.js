// Modulo.js Patch for "JSONP"-style callback to handle file:// protocol
window.DOCTYPE_MODULO || (function setupDoctypeModulo (reg, doc) {
    const originalFetch = reg.core.FetchQueue.prototype.fetch;
    reg.core.FetchQueue.prototype.fetch = function fetch(src) {
        return src in this.data || src in this.queue ? originalFetch(src) : {
            then: (resolve, reject) => {
                this.queue[src] = [ resolve ]; // Add self to queue
                window._FILE = window.DOCTYPE_MODULO = s => { window.___QFILE = s };
                const scriptTag = doc.createElement('SCRIPT');
                scriptTag.onload = () => this.receiveData(window.___QFILE, src)
                scriptTag.src = src + (src.endsWith('/') ? 'index.html' : '');
                doc.head.append(scriptTag);
            },
        };
    };
    doc.head.append(reg.utils.newNode('<Modulo -src="./static/"></Modulo>').firstChild);
    modulo.loadFromDOM(doc.head, null, true); // Ensure loading is kicked off sync
})(modulo.registry, window.document);
