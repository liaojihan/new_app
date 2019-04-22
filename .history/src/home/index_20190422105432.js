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
    constructor(props){
        super(props);
        this.state = {
            detail_url: 'https://api.douban.com/v2/movie/subject/',
            film_url: 'https://api.douban.com/v2/movie/in_theaters?',
            release_url: 'http://api.douban.com/v2/movie/coming?apikey=0df993c66c0c636e29ecbb5344252a4a',
            top_url: 'http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a'
        }
    }

    componentWillMount() {
        console.log(this.props);
    }

    render() {
        return (
            <div className="App">
                <div className="top">
                    <div className="content">
                        <div className="left">
                            <img src={topImage} alt=""/>
                        </div>
                        <div className="nav">
                            <ul>
                                <li>
                                    <Link to='/home' onClick={(e) => this.handleStatus(e)}>
                                        首页
                                    </Link>
                                    <Link to={{ pathname: '/hot', state: { url: this.state.film_url } }}
                                        onClick={(e) => this.handleStatus(e)}>
                                        热映
                                    </Link>
                                    <Link to={{ pathname: '/soon', state: { url: this.state.release_url } }}
                                        onClick={(e) => this.handleStatus(e)}>
                                        上映
                                    </Link>
                                    <Link to={{ pathname: '/bank', state: { url: this.state.top_url } }}
                                        onClick={(e) => this.handleStatus(e)}>
                                        榜单
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <form>
                            <input type="search" placeholder="找影片、找影人" className="search"/>
                        </form>
                    </div>
                </div>
                <Route path='/home' component={Container} />
                <Route path='/hot' component={Top} />
                <Route path='/soon' component={Top} />
                <Route path='/bank' component={Top} />
                <Route path='/details' component={Details}/>
                <Footer/>
            </div>
        )
  }
}


export default Home