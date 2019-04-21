import React from 'react'
import { Menu, Icon } from 'antd';
import './index.css'
import topImage from '../images/film.jpg'
import { inject, observer } from 'mobx-react/index'
import { Link, Route } from 'react-router-dom'
import Container from '../container'


@inject('appStore') 
@observer
class Header extends React.Component{

    constructor(props){
        super(props);
        this.handleStatus = this.handleStatus.bind(this);
        this.state = {
            isClick: this.props.code //a标签状态，是否被点击，0:未点击 1:被点击
        }
    }

    handleStatus = index => {
        this.setState({
            isClick: parseInt(index)
        });
        this.props.appStore.refresh(parseInt(index));
    };

    render (){
        const nav_ul = [['首页', '/'], ['热映', '/hot'], ['上映', '/soon'], ['榜单',  '/rank']];
        return (
            // 导航栏内容
            null
        );
    }
}

export default Header
