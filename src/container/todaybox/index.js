import React, {Component} from 'react'
import fetchJsonp from 'fetch-jsonp'
import { inject, observer } from 'mobx-react/index'
import { Spin } from "antd";

@inject('appStore') 
@observer
class TodayBox extends Component{

    constructor(props) {
        super(props);
        this.state = {
            list: null,
            sign: true
        }
    }

    componentDidMount() {
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
                this.setState({
                    list: result['subjects'],
                    sign: false
                });
            });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    static handlerBoxValue(number) {
        let box = '';
        if (number > Math.pow(10, 8)) {
            let box_count = (number / Math.pow(10, 8)).toFixed(2);
            box += box_count + '亿';
        }else if (Math.pow(10, 4) < number < Math.pow(10, 8)) {
            let box_count = (number / Math.pow(10, 4)).toFixed(2);
            box += box_count + '万';
        }else {
            box += number;
        }
        return box;
    }

    movieItem = id => {
        this.props.appStore.refreshCodeAndId('today', id);
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
                        <a href="javascript:void(0);" onClick={(e) => this.movieItem(value.subject.id, e)}
                           title={value.subject.title}>
                            <span className="normal-span">
                                <i className={index < 3 ? rank + ' ' +rank_top : rank}>
                                    { index + 1 }
                                </i>
                                <span className="movie-name">
                                    {value.subject.title}
                                </span>
                                <span className="movie-box">
                                    {
                                        TodayBox.handlerBoxValue(value.box)
                                    }
                                </span>
                            </span>
                        </a>
                    </li>
                );
            });
        }
        return (
            <div className="movie-top">
                <Spin size="large" spinning={this.state.sign ? true : false}>
                    <div className="head">
                        <span className="top-today">{this.props.title}</span>
                    </div>
                    <div className="movie-list">
                        <ul className="movie-ul">
                            {li_list}
                        </ul>
                        <div className="movie-clear"></div>
                    </div>
                </Spin>
            </div>
        );
    }
}

export default TodayBox