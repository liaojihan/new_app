import React, { Component, Children } from 'react'
import Footer from "../footer";
import { inject, observer } from "mobx-react";
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import topImage from '../../images/film.jpg'
import "./index.css"
import Container from "../container"
import Top from "../top"
import Details from "../details"

@inject('appStore') 
@observer
class Home extends Component {

    handleStatus = (index) => {
        this.props.appStore.refresh(Number.parseInt(index))
    }

    render() {
        const li_list = [
            ['首页', '/home'],
            ['热映', '/hot/film_url'],
            ['上映', '/soon/release_url'],
            ['榜单', '/bank/top_url']
        ]
        return (
            <div className="App">
                <div className="top">
                    <div className="content">
                        <div className="left">
                            <img src={topImage} alt=""/>
                        </div>
                        <div className="nav">
                            <ul>
                                
                                {
                                    li_list.map((value, index) => 
                                        return (
                                            <li key={index} onClick={(e) => this.handleStatus(index, e)}>
                                                <Link to={value[1]} className={this.props.appStore.refreshCode === index ? 'active' : ''}>
                                                    {value[0]}
                                                </Link>
                                            </li>
                                        )
                                    )
                                }
                               
                            </ul>
                        </div>
                        <form>
                            <input type="search" placeholder="找影片、找影人" className="search"/>
                        </form>
                    </div>
                </div>
                <Switch>
                    <Route exact path='/:url' component={Container}/>
                    <Route exact path='/hot/:url' component={Top} />
                    <Route exact path='/soon/:url' component={Top} />
                    <Route exact path='/bank/:url' component={Top} />
                    <Route exact path='/details/:id' component={Details} />
                    <Redirect exact path='/' to={{ pathname: '/home' }} />
                </Switch>
                <Footer/>
            </div>
        )
  }
}


export default Home