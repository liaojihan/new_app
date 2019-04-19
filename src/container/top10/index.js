import React, {Component} from 'react'
import fetchJsonp from 'fetch-jsonp'
import { inject, observer } from 'mobx-react/index'

@inject('appStore') 
@observer
class Top10 extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list: null
        }
    }

    componentWillMount() {
        fetchJsonp(
            this.props.url,
            {
                method: 'GET',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => response.json())
            .then(result => {
                console.log(result);
                this.setState({
                    list: result['subjects']
                });
                this.props.appStore.refreshSign(false);
            });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    movieItem = id => {
        this.props.appStore.refreshCodeAndId('top', id);
    };

    render() {
        const { list } = this.state;
        const rank = 'rank-index';
        const rank_top = 'rank-index-top';
        let li_list;
        if (list) {
            li_list = list.map( (value, index) => {
                return (
                    <li key={index}>
                        <a href="javascript:void(0);" onClick={(e) => this.movieItem(value.id, e)}
                           title={value.title}>
                            <span className="normal-span">
                                <i className={index < 3 ? rank + ' ' +rank_top : rank}>
                                    { index + 1 }
                                </i>
                                <span className="movie-name">
                                    {value.title}
                                </span>
                                <span className="movie-box">
                                    {value.rating.average}
                                </span>
                            </span>
                        </a>
                    </li>
                );
            });
        }
        return (
            <div className="movie-top">
                <div className="head">
                    <span className="top-today">{this.props.title}</span>
                </div>
                <div className="movie-list">
                    <ul className="movie-ul">
                        {li_list}
                    </ul>
                    <div className="movie-clear"></div>
                </div>
            </div>
        );
    }
}

export default Top10