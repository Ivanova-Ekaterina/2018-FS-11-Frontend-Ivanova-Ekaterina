export default ((self) => {
    console.log("start");
    const ports = [];
    self.addEventListener('connect', (event) => {
        const port = event.source;
        console.log('hi', port);
        ports.push(port);
        port.addEventListener('message', (event) => {
            console.log(event.data, 'lol');
            switch (event.data.reqData){
                case 'get_chats':
                    fetch('http://ivanova_ekaterina.ignorelist.com/API/get_chats_list')
                        .then(response => response.json())
                        .then(data => {
                            port.postMessage(data);
                        })
                        .catch(error => port.postMessage(error.toString()));
                    break;
                case 'add_chat':
                    fetch('http://ivanova_ekaterina.ignorelist.com/API/create_chat_with_user/' + event.data.topic + '&' + event.data.nick2 + '&' + event.data.nick1)
                        .then(response => response.json())
                        .then(data => {
                            port.postMessage(data);
                        })
                        .catch(error => port.postMessage('chat' + error.toString()));
                    break;
                case 'create_user':
                    fetch('http://ivanova_ekaterina.ignorelist.com/API/create_user/' + event.data.nick + '&' + event.data.name)
                        .then(response => response.json())
                        .then(data => {
                            port.postMessage(data);
                        })
                        .catch(error => port.postMessage('user' + error.toString()));
                    break;
                case 'find_user':
                    fetch('http://ivanova_ekaterina.ignorelist.com/API/find_user/' + event.data.nick)
                        .then(response => response.json())
                        .then(data => {
                            port.postMessage(data);
                        })
                        .catch(error => port.postMessage('user' + error.toString()));
                    break;
                default:
                    break;
            }
            if (event.data === 'disconnect') {
                ports.splice(ports.indexOf(event.target), 1);
            } else {
                ports.filter(port => port !== event.target).forEach((port) => {
                    console.log(event.data);
                });
            }
        });
        port.start();
    });
});