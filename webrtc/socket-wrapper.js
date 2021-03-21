const namespace = typeof (browser) !== 'undefined' ? browser : chrome;
const extensionId = "jlbfpfjplbgphggjnjibagelcknhbooo";

(function () {
    console.log("setting socket wrapper..")
    var OrigWebSocket = window.WebSocket;
    var callWebSocket = OrigWebSocket.apply.bind(OrigWebSocket);
    var wsAddListener = OrigWebSocket.prototype.addEventListener;
    wsAddListener = wsAddListener.call.bind(wsAddListener);
    window.WebSocket = function WebSocket(url, protocols) {
        console.log("socket constructor !")
        var ws;
        if (!(this instanceof WebSocket)) {
            // Called without 'new' (browsers will throw an error).
            ws = callWebSocket(this, arguments);
            console.log("call function argument socket constructor")
        } else if (arguments.length === 1) {
            ws = new OrigWebSocket(url);
            console.log("1 argument socket constructor")
        } else if (arguments.length >= 2) {
            ws = new OrigWebSocket(url, protocols);
            console.log("2 argument socket constructor")
        } else { // No arguments (browsers will throw an error)
            ws = new OrigWebSocket();
        }

        wsAddListener(ws, 'message', (event) => {
            console.log(event.data);
        });
        return ws;
    }.bind();
    window.WebSocket.prototype = OrigWebSocket.prototype;
    window.WebSocket.prototype.constructor = window.WebSocket;

    var wsSend = OrigWebSocket.prototype.send;
    wsSend = wsSend.apply.bind(wsSend);
    OrigWebSocket.prototype.send = function (data) {
        console.log(data);
        return wsSend(this, arguments);
    };
})();


var handle = setInterval(() => {
    if (window.Ra && window.Ra.onmessage) {
        clearInterval(handle);
        var onmessage = window.Ra.onmessage;
        var sendMessageFn = window.P;
        window.Ra.onmessage = (event) => {
            console.log(event.data);
            window.postMessage(event.data);
            onmessage(event);
        };

        window.P = (data) => {
            console.log(data);
            window.postMessage(data);
            sendMessageFn(data);
        }
    }
}, 1000);
