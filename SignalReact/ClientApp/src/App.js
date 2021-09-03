import React from 'react';
import ChatContainer from './components/ChatContainer';
import Login from './components/Login';
import ChatProvider from './contexts/ChatContext';

import './custom.css'

const App = () => {

    return (
        <>
        <ChatProvider>
            <Login />
            <ChatContainer />
        </ChatProvider>
        </>
    );
}

export default App;