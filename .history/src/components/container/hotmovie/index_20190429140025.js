import React, {Component} from 'react'
import all from '../../../images/arrow_right.png'
import { inject, observer } from 'mobx-react'
import { Spin } from "antd";
import { withRouter, Link } from 'react-router-dom'
import { loadHotMovieAction } from '../../../actions/hotmovie'
import { connect } from 'react-redux';

@inject('appStore')
@observer
@withRouter
class HotMovie extends Component{

    constructor(props) {
        super(props);
        this.state = {
            list: null,
            sign: true
        }
    }

    componentDidMount() {
        this.props.dispatch(loadHotMovieAction)
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    movieItem = id => {
        this.props.appStore.refresh('dd')
        this.props.history.push({ pathname: `/details/${id}` })
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
                <Spin size="large" spinning={this.state.sign ? true : false}>
                    <div className="head">
                        <img src={all} alt=""/>
                        <span className="all"><Link to='/hot/film_url'>全部</Link></span>
                        <span className="hot">{this.props.title}</span>
                    </div>
                    <div className="movie-list">
                        <dl className="movie_dl">
                            {dd_list}
                        </dl>
                        <div className="movie-clear"></div>
                    </div>
                </Spin>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        post
    }
}

export default connect()