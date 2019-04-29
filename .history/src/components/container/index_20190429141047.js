import React from 'react'
import './index.css'
import HotMovie from "./hotmovie";
import TodayBox from "./todaybox";
import Soon from "./soon";
import Top10 from "./top10";
import { inject, observer } from "mobx-react"
import { withRouter } from "react-router-dom";

@withRouter
@inject('appStore')
@observer
class Container extends React.Component{

    constructor(props){
        super(props)
        this.props.appStore.refresh(this.props.match.params.url);
    }


    render (){
        return (
            <div className="container">
                <div className="content">
                    <div className="showing-up">
                        <HotMovie title="正在热映"/>
                        <TodayBox title="北美今日票房"/>
                    </div>
                    <div className="shown-soon">
                        <Soon title="即将上映"/>
                        <Top10 title="TOP10"/>
                    </div>
                </div>
            </div>
        );
    }

}

export default Container