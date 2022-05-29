import React from 'react';
import {RecoilRoot} from "recoil";
import classes from './App.module.css';
import {Header} from "./components/Header";
import {Main} from "./components/Main";
import {Footer} from "./components/Footer";


const App: React.FC = () => (
    <RecoilRoot>
        <div className={classes.App}>
            <Header/>
            <Main/>
            <Footer/>
        </div>
    </RecoilRoot>);

export default App;
