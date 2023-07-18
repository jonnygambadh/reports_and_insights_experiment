import React from "react";
import ReactDOM from "react-dom";

import App from './app';

const Container = () => {
  return <App name="Gambonny" />;
}

ReactDOM.render(<Container />, document.getElementById('root'));
