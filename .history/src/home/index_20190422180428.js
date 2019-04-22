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
    constructor(props) {
        super(props);
        this.state = {
            sign: 0
        }
    }
    handleStatus = (index) => {
        this.setState({
            sign: parseInt(index)
        });
    }

    render() {
        const li_list = [
            ['首页', '/'],
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
                                    li_list.map((value, index) => {
                                        return (
                                            <li key={index} onClick={(e) => this.handleStatus(index, e)}>
                                                <Link to={value[1]} className={this.state.sign === index ? 'active' : ''}>
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
                <Route exact path='/' component={Container} />
                <Route path='/hot/:url' component={Top} />
                <Route  path='/soon/:url' component={Top} />
                <Route  path='/bank/:url' component={Top} />
                <Route  path='/details/:id' component={Details}/>
                <Footer/>
            </div>
        )
  }
}


export default Home