const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('d:\\__GITHUB\\_ct-MOM\\index.html', 'utf8');

const dom = new JSDOM(html, { 
    runScripts: "dangerously",
    beforeParse(window) {
        window.BroadcastChannel = function() {
            this.postMessage = function() {};
            this.onmessage = null;
        };
        window.BroadcastChannel.prototype.postMessage = function() {};
        
        window.HTMLCanvasElement.prototype.getContext = function() {
            return {
                clearRect: function(){},
                save: function(){},
                translate: function(){},
                rotate: function(){},
                fillText: function(){},
                restore: function(){}
            };
        };
    }
});

setTimeout(() => {
    try {
        console.log("slidesWrapper HTML length:", dom.window.document.getElementById('slides-wrapper').innerHTML.length);
        console.log("slidesWrapper First 1000 chars:\n", dom.window.document.getElementById('slides-wrapper').innerHTML.substring(0, 1000));
        console.log("All variables in state:", JSON.stringify(dom.window.state || {}));
    } catch(e) {
        console.log("Error:", e);
    }
}, 1000);
