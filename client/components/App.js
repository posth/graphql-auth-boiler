import React from 'react';
import Header from './Header';

//Functional compoment because all it does is show the header and child vue
//No component level state so it's a functional component
const App = (props) => {
    return (
        <div className="container">
            <Header />
            {/*Always pass props to children just in case we get some*/}
            {props.children}
        </div>
    );
};

export default App;