import React, {Component} from 'react'
import fetchJsonp from 'fetch-jsonp'
import { inject, observer } from 'mobx-react'
import './index.css'
import { Spin, message } from 'antd';
import { withRouter } from "react-router-dom";

const info = () => {
    message.info("当前数据为空");
}

@inject('appStore') 
@observer
@withRouter
class Top extends Component{

    constructor(props) {
        super(props);
        this.state = {
            list: null,
            pageCurrent: 1, //当前页码
            pageSize: 24, //本页size
            pageTotal: 0, //总页数
            sign: true, // 是否加载loading
            urls: {
                film_url: 'https://api.douban.com/v2/movie/in_theaters?',
                release_url: 'http://api.douban.com/v2/movie/coming?apikey=0df993c66c0c636e29ecbb5344252a4a',
                top_url: 'http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a'
            },
            title: '未知',
            key: props.match.params.url,
            success: false // 是否发生错误
        }
    }   

    loadList = () => {
        console.log(this.state.pageCurrent);
        fetchJsonp(
            this.state.urls[this.state.key] + 
            '&start=' + 
            (this.state.pageCurrent * this.state.pageSize - this.state.pageSize) + 
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
                this.setState({
                    list: typeof(result.entries) == 'undefined' ? result.subjects : result.entries,
                    pageStart: this.state.pageCurrent * this.state.pageSize - this.state.pageSize,
                    pageTotal: Math.floor((result.total + this.state.pageSize - 1) / this.state.pageSize),
                    sign: false,
                    title: result.title
                });
            });
    }

    componentDidMount() {
        this.loadList();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    static getDerivedStateFromProps(props, state) {
        const key = props.match.params.url
        if (key !== state.key) {
            return {
                key: key,
                sign: true,
                pageCurrent: 1
            }
        }
        return null
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.match.params.url === this.state.key) {
            return false
        }
        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.key !== this.state.key) {
            this.loadList();
        }
    }

    pageHandler = value => {
        // 翻页处理
        if (this.state.pageCurrent === value){
            return;
        }
        this.setState({
            sign: true,
            pageCurrent: value
        }, () => this.loadList());
        
    }

    detailHandler = value => {
        // 详情处理
        this.props.appStore.refresh('dd')
        this.props.history.push({ pathname: `/details/${value}`})
    }

    render() {
        console.log("执行了render()");
        const { list } = this.state;
        let movie_list;
        let page_list;
        if (list){
            movie_list = list.map( (value, index) => 
                
                    <li key={index} title={value.title}>
                        <a href="javascript:void(0);" onClick={ (e) => this.detailHandler(value.id, e)}>
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
                                    if (value.rating instanceof Object) {
                                        return (
                                            <div className="li-score">
                                                <span>
                                                    {value.rating.average === 0 ? '暂无' : value.rating.average}
                                                </span>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div className="li-score">
                                                <span>
                                                    {value.pubdate === "" ? '暂定' : value.pubdate}
                                                </span>
                                            </div>
                                        );
                                    }       
                                }
                            )()
                        }
                    </li>
                
            );

            let items = [];
            for (let i=1; i <= this.state.pageTotal; i ++ ){
                items.push(i);
            }

            page_list = items.map( (value, index) => 
                
                    <li key={index} className={this.state.pageCurrent === value ? 'active' : 'ban'}
                        onClick={(e) => this.pageHandler(value, e)}>
                        <a href="javascript:void(0);">
                            {value}
                        </a>
                    </li>
                
            )
        }
        return (
           <div className="all-movie">
                <div className="all-content">
                    <div className="movie-title">
                        <h1>{this.state.title}</h1>
                    </div>
                    <Spin spinning={this.state.sign ? true : false} 
                        size="large">
                        <div className="movie-container">
                            <div className="movie-list">
                                <ul>
                                    {movie_list}
                                    <div className="clear"></div>
                                </ul>
                            </div>
                            <div className="page-ul">
                                <ul className={this.state.pageTotal >= 1 ? 'active' : 'hide'}>
                                    
                                        {page_list}
                                    
                                    <div className="clear"></div>
                                </ul>
                            </div>
                        </div>
                    </Spin>
                </div>
           </div>
        );
    }
}

export default Top