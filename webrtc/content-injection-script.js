
const namespace = typeof (browser) !== 'undefined' ? browser : chrome;

var script = document.createElement('script');
script.src = namespace.runtime.getURL('socket-wrapper.js');
script.onload = () => script.remove();
(document.head || document.documentElement).appendChild(script);


window.addEventListener('message', (event) => {
    //Send to background service to access to all WebExtension APIs set e.g windows.create() 
    namespace.runtime.sendMessage(event.data);
});
