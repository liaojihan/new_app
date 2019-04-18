import React, {Component} from 'react'
import fetchJsonp from 'fetch-jsonp'
import staticImg from '../images/static-picture.png'
import { inject, observer } from 'mobx-react'
import loadingImg from '../images/Ripple-1s-200px.gif'
import './index.css'

@inject('appStore') 
@observer
class Top extends Component{

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageCurrent: 1, //当前页码
            pageSize: 20, //本页size
            dataTotal: 100, // 总记录数 20 * 5 = 100 
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
                this.setState({
                    list: result,
                    pageCurrent: value,
                    pageStart: value * this.state.pageSize - this.state.pageSize,
                    pageTotal: Math.floor((this.state.dataTotal + this.state.pageSize - 1) / this.state.pageSize)
                });
            });
    }

    componentDidMount() {
        this.loadList(this.state.pageStart);
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

    render() {
        const {list} = this.state;
        console.log(list);
        let movie_list;
        let page_list;
        if (list){
            movie_list = list.subjects.map( (value, index) => {
                return (
                    <li key={index}>
                        <div className="li-img">
                            <img src={value.images.medium === null ?  staticImg : value.images.medium} alt="dsknd"/>
                        </div>
                        <div className="li-name">
                            <span>
                                {value.title}
                            </span>
                        </div>
                        <div className="li-score">
                            <span>
                                {value.rating.average}
                            </span>
                        </div>
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
                        <a className={this.state.pageCurrent === value ? }>

                        </a>
                    </li>
                );
            })
        }else {
            movie_list = (
                <img src={loadingImg} alt=""/>
            );
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
                                {page_list}
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