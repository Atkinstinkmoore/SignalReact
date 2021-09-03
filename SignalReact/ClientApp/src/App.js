import React, { useState } from 'react';
import ChatContainer from './components/ChatContainer';
import Login from './components/Login';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatProvider from './contexts/ChatContext';

import './custom.css'

const App = () => {

    return (
        <>
        <ChatProvider>
            <Login />
            <ChatContainer></ChatContainer>
        </ChatProvider>
        </>
    );
}

export default App;