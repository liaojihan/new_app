import React, { Component } from 'react'
import Footer from "../footer";
import { inject, observer } from "mobx-react";
import { Link, Route } from 'react-router-dom'
import topImage from '../images/film.jpg'
import "./index.css"
import Container from "../container";
import Top from "../top"
import Details from "../details"

@inject('appStore') 
@observer
class Home extends Component {
    handleStatus = (index) => {
        this.props.appStore.refreshCode(parseInt(index));
    }

    render() {
        const li_list = [
            ['首页', '/home'],
            ['热映', '/hot/film_url'],
            ['上映', '/soon/film_url'],
            ['榜单', '/bank/release_url']
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
                                    li_list.map((value, index) => {
                                        return (
                                            <li key={index}>
                                                <Link to={value[1]} onClick={(e) => this.handleStatus(index, e)}
                                                    className={this.props.appStore.refreshCode === index ? 'active' : ''}>
                                                    {value[0]}
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                               
                            </ul>
                        </div>
                        <form>
                            <input type="search" placeholder="找影片、找影人" className="search"/>
                        </form>
                    </div>
                </div>
                <Route exact path='/home' component={Container} />
                <Route path='/hot/:url' component={Top} />
                <Route  path='/soon/:url' component={Top} />
                <Route  path='/bank/:url' component={Top} />
                <Route  path='/details' component={Details}/>
                <Footer/>
            </div>
        )
  }
}


export default Home