import React, { Component } from 'react';
import './App.css';
import Header from './header'
import Container from "./container";
import Top from "./top"
import Details from "./details"
import Footer from "./footer";
import { inject, observer } from 'mobx-react/index'

@inject('appStore') 
@observer
class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            detail_url: 'https://api.douban.com/v2/movie/subject/',
            film_url: 'https://api.douban.com/v2/movie/in_theaters?',
            release_url: 'http://api.douban.com/v2/movie/coming?apikey=0df993c66c0c636e29ecbb5344252a4a',
            top_url: 'http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a'
        }
    }


    render() {
        this.props.appStore.refreshSign(true);
        return (
            <div className="App">
                <Header code={this.props.appStore.refreshCode}/>
                {   
                    (
                        () => {

                            switch (this.props.appStore.refreshCode){

                                case 0:
                                    return <Container/>;

                                case 1:
                                    return <Top url={this.state.film_url} title="正在热映"/> ;

                                case 2:
                                    return <Top url={this.state.release_url} title="即将上映"/> ;

                                case 3:
                                    return <Top url={this.state.top_url} title="豆瓣TOP排行"/>;

                                default:
                                    return <Details movie_id={this.props.appStore.id} url={this.state.detail_url}/>;

                            }
                        }
                    )()
                }
                <Footer/>
            </div>
        );
    }
}

export default App;
