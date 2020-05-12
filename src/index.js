import React from 'react';
import ReactDOM from 'react-dom';
import "./sortStyle.scss";
import App from './components/App';
// create react component
/*const App = () => {
	const numOfBars = 10;
    return (
        <div className = "container">
        	<h3 className = "text-center">Sorting Visualizer</h3>
        	<Bars numOfBars = {numOfBars}></Bars>
        </div>
    );
}*/

// take the react component and show it on the screen 
ReactDOM.render(
    <App />,
    document.querySelector("#root")
)