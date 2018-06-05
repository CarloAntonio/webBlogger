import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

//import axios from 'axios';
import axiosInstance1 from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {

    state = {
        post: []
    }

    //component did mount is the best place to perform network request
    componentDidMount() {
        //async
        axiosInstance1.get('/posts')
            .then(response => {

                //pagination (get only a first 4 items in array)
                const cutPosts = response.data.slice(0, 4);
                
                //update all post object by adding an author
                const updatedPost = cutPosts.map(post => {
                    return {
                        ...post,
                        author: 'Carlo'
                    }
                });

                this.setState({
                    post: updatedPost //extract data from res and place it in state
                });
            }) //promise for async response
            .catch(error => {
                console.log(error);
                //this.setState({error: true});
            }) //error handler
    }

    postSelectorHandler = (id) => {
        //this.setState({selectedPostId : id})

        //this.props.history.push({pathname: '/posts/' + id})
        this.props.history.push('/posts/' + id);
    }

    render() {
        //default return element
        let post = <p style={{textAlign:'center'}}>Something went wrong.</p>;

        //check for error from server
        if(!this.state.error) {
            post = this.state.post.map(post => {
                return (
                //<Link to={'/posts/' + post.id}  >
                    <Post 
                        key={post.id}
                        title={post.title} 
                        author={post.author}
                        clicked={() => this.postSelectorHandler(post.id)}/>
                //</Link>
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {post}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;