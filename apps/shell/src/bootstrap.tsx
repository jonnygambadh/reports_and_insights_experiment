import React from "react";
import { createRoot } from "react-dom/client";
import { useStore } from '@nanostores/react'
import { $counter, add } from 'host/Counter'

import App from './app';

const Main = () => {
  const value = useStore($counter);
  console.log('value: ', value);

  React.useEffect(() => {
    add(20);
  }, []);

  console.log('value: ', value);

  return <App name="Gambonny" />
}

const container = createRoot(document.getElementById("root")!);

container.render( <Main />);
