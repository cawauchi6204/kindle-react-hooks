import React, { FC } from "react";
import DownloadPage from "./downloadPage";
import TopHeader from "../components/topPage/topHeader"
import TopMain from "../components/topPage/topMain"
import ResultPage from './resultPage';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
// デフォルトでインポートされないものに{}をつける

const TopPage: FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <TopHeader />
                    <TopMain />
                </Route>
                <Route exact path="/search/:keyword">
                    <ResultPage />
                </Route>
                <Route path="/download/:keyword" exact>
                    <DownloadPage />
                </Route>
            </Switch>
        </Router>
    )
}

// 関数に型をつけた場合、戻り値が指定した型になるので、『FC』型の関数は『FC』型の戻り値を返します。

export default TopPage;

