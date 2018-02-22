import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./App";
import rootReducer from "./rootReducer";
import registerServiceWorker from "./registerServiceWorker";

// 

const store = createStore(
	rootReducer
);


ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Route component={App}/>
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);
registerServiceWorker();
