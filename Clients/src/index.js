import React from 'react';
import reactDom from 'react-dom/client';
import Routing from './Component/Routing';
const container = document.getElementById('root');
const root = reactDom.createRoot(container)
root.render(<Routing/>)