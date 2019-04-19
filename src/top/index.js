import React, {Component} from 'react'
import fetchJsonp from 'fetch-jsonp'
import { inject, observer } from 'mobx-react'
import './index.css'
import { Spin, message } from 'antd';

const info = () => {
    message.info("当前数据为空");
}

@inject('appStore') 
@observer
class Top extends Component{

    constructor(props) {
        super(props);
        this.state = {
            list: null,
            pageCurrent: 1, //当前页码
            pageSize: 24, //本页size
            pageTotal: 0 //总页数
        }
    }   

    loadList = (value, url) => {
        fetchJsonp(
            url + 
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
                console.log(result);
                this.setState({
                    list: typeof(result.entries) == 'undefined' ? result.subjects : result.entries,
                    pageCurrent: value,
                    pageStart: value * this.state.pageSize - this.state.pageSize,
                    pageTotal: Math.floor((result.total + this.state.pageSize - 1) / this.state.pageSize)
                }, () => this.props.appStore.refreshSign(false));
            });
    }

    componentDidMount() {
        this.loadList(this.state.pageCurrent, this.props.url);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    componentWillReceiveProps(nextProps) {
        this.loadList(1, nextProps.url);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.url === this.props.url && nextState === this.state){
            return false
        }
        return true
    }

    pageHandler = value => {

        if (this.state.pageCurrent === value){
            return;
        }
        this.props.appStore.refreshSign(true);
        this.loadList(value, this.props.url);
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
                    <li key={index} title={value.title}>
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
                                    if (value.rating instanceof Object) {
                                        console.log('评分');
                                        return (
                                            <div className="li-score">
                                                <span>
                                                    {value.rating.average === 0 ? '暂无' : value.rating.average}
                                                </span>
                                            </div>
                                        );
                                    } else {
                                        console.log('日期');
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
            });

            let items = [];
            for (let i=1; i <= this.state.pageTotal; i ++ ){
                items.push(i);
            }

            page_list = items.map( (value, index) => {
                return (
                    <li key={index} className={this.state.pageCurrent === value ? 'active' : 'ban'}
                        onClick={(e) => this.pageHandler(value, e)}>
                        <a href="#">
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
                        <h1>{this.props.title ? this.props.title : '未知'}</h1>
                    </div>
                    <Spin spinning={this.props.appStore.loadingSign ? true : false} 
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