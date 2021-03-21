const namespace = typeof (browser) !== 'undefined' ? browser : chrome;

namespace.runtime.onMessage.addListener((message, sender, response) => {
    socketMessageHandler(message);
});


const socketMessageHandler = async (message) => {
    if (message !== '') {
        //Test login action
        if (/^\?(\d{1}).+#{1}\t.+$/.test(message)) {
            namespace.windows.create({
                url: 'main.html',
                type: 'popup',
            })
        }
    }
};