import React, {Component} from 'react'
import fetchJsonp from 'fetch-jsonp'
import { inject, observer } from 'mobx-react'
import './index.css'
import { Spin } from 'antd';

@inject('appStore') 
@observer
class Top extends Component{

    constructor(props) {
        super(props);
        this.state = {
            list: null,
            p   ageCurrent: 1, //当前页码
            pageSize: 24, //本页size
            dataTotal: 120, // 总记录数 24 * 5 = 120 
            pageTotal: 0 //总页数 
        }
    }   

    loadList = (value) => {
        fetchJsonp(
            this.props.url + 
            '&start=' + 
            (value * this.state.pageSize - this.state.pageSize) + 
            '&count=' + this.state.pageSize,
            {
                method: 'get',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => response.json())
            .then(result => {
                console.log();
                this.setState({
                    list: typeof(result.entries) == 'undefined' ? result.subjects : result.entries,
                    pageCurrent: value,
                    pageStart: value * this.state.pageSize - this.state.pageSize,
                    pageTotal: Math.floor((this.state.dataTotal + this.state.pageSize - 1) / this.state.pageSize)
                });
            });
    }

    componentDidMount() {
        this.loadList(this.state.pageCurrent);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if (nextProps === this.props && nextState === this.state){
            return false
        }
        return true
    }

    pageHandler = value => {

        if (this.state.pageCurrent === value){
            return;
        }
        this.loadList(value);
    }

    detailHandler = value => {
        this.props.appStore.refreshCodeAndId('top', value);
    }

    render() {
        const { list } = this.state;
        let movie_list;
        let page_list;
        if (list){
            movie_list = list.map( (value, index) => {
                return (
                    <li key={index}>
                        <a href="javascript:void(0)" onClick={ (e) => this.detailHandler(value.id, e)}>
                            <div className="li-img">
                                <img src={value.images.medium} alt="dsknd"/>
                            </div>
                            <div className="li-name">
                                <span>
                                    {value.title}
                                </span>
                            </div>
                        </a>
                        {
                            (
                                () => {
                                    switch (value.rating.length){
                                        case 0:
                                            return (
                                                null
                                            );
                                        default:
                                            return  (
                                                <div className="li-score">
                                                    <span>
                                                        {value.rating.average}
                                                    </span>
                                                </div>
                                            );
                                    }       
                                }
                            )()
                        }
                    </li>
                );
            });

            let items = [];
            for (let i=1; i <= this.state.pageTotal; i ++ ){
                items.push(i);
            }

            page_list = items.map( (value, index) => {
                return (
                    <li key={index}>
                        <a href="javascript:void(0);" className={this.state.pageCurrent === value ? 'active' : 'ban'} 
                        onClick={(e) => this.pageHandler(value, e)}>
                            {value}
                        </a>
                    </li>
                );
            })
        }
        return (
           <div className="all-movie">
                <div className="all-content">
                    <div className="movie-title">
                        <h1>{list ? list.title : ''}</h1>
                    </div>
                    <div className="movie-container">
                        <div className="movie-list">
                            <ul>
                                {movie_list}
                                <div className="clear"></div>
                            </ul>
                        </div>
                        <div className="page-ul">
                            <ul className={this.state.pageTotal >= 1 ? 'active' : 'hide'}>
                                <Spin spinning={this.state.list ? false : true} 
                                    size="large" className="movie-spin">
                                    {page_list}
                                </Spin>
                                <div className="clear"></div>
                            </ul>
                        </div>
                    </div>
                </div>
           </div>
        );
    }
}

export default Top