import React, { Component } from 'react';

import { MessageForm } from './components/message-form';
import { Head } from './components/head';

class App extends Component {
    render() {
        return (
            <div>
                <Head/>
                <MessageForm />
            </div>
        );
    }
}

export default App;