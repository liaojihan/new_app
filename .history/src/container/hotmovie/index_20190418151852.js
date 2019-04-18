import React, {Component} from 'react'
import all from '../../images/arrow_right.png'
import loadingImg from '../../images/Ripple-1s-200px.gif'
import staticImg from '../../images/static-picture.png'
import fetchJsonp from 'fetch-jsonp'
import { inject, observer } from 'mobx-react/index'
import { Spin } from "antd";

@inject('appStore')
@observer
class HotMovie extends Component{

    constructor(props) {
        super(props);
        this.state = {
            list: null
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
                    list: result['subjects']
                })
            });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    movieItem = id => {
        this.props.appStore.refreshCodeAndId('hot', id);
    };

    render() {

        const { list } = this.state;
        let dd_list;
        if (list){
            dd_list = list.map( (value, index) => {
                return (
                    <dd key={index}>
                        <div className="movie-item">
                            <a href="javascript:void(0);" onClick={(e) => this.movieItem(value.id, e)} 
                            title={value.title}>
                                <img src={value.images.small} alt=""/>
                                <div className="position active">
                                    <span>
                                        {
                                            value.title.length > 6
                                                ?
                                                value.title.substring(0, 5) + '...'
                                                :
                                                value.title
                                        }
                                    </span>
                                    <i>
                                        {
                                            value.rating.average == 0
                                                ?
                                                '暂无'
                                                :
                                                value.rating.average
                                        }
                                    </i>
                                </div>
                            </a>
                        </div>
                    </dd>
                );
            });
        }
        return (
            <div className="movie-grid">
                <div className="head">
                    <img src={all} alt=""/>
                    <span className="all"><a href="#">全部</a></span>
                    <span className="hot">{this.props.title}</span>
                </div>
                <div className="movie-list">
                    <dl className="movie_dl">
                        <Spin >
                            {dd_list}
                        </Spin>
                    </dl>
                </div>
            </div>
        );
    }
}

export default HotMovie