import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';

//lazy loading example:
import asyncComponent from '../../hoc/asyncComponent';
//import NewPost from './NewPost/NewPost'; //commented out for lazy loading example
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true //use false to test guard
    }

    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                to="/posts/" 
                                exact>Post</NavLink></li>
                            <li><NavLink to={{
                                pathname: "/new-post",
                                hash: '#submit', //unused in all, simply an example
                                search: '?quick-submit=true' //unused in all, simply an example
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>}/> */}
                <Switch>
                    {/* 1. Original Code, 2. Lazy Loading code */}
                    {/* 1. {this.state.auth ? <Route path="/new-post" component={NewPost} /> : null} */}
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
                    <Route path="/posts" component={Posts} /> 
                    {/* The 404 catch below needs to be last(404 catch is a concept rather then set of code) */}
                    {/* <Route render={() => <h1>Not Found, Can also use component</h1>}/>  can redirect or catch non-existant paths*/}
                    <Redirect from="/" to="/posts" />
                </Switch>
            </div>
        );
    }
}

export default Blog;