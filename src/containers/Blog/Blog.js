import React, { Component } from 'react';
//import axios from 'axios';
import axiosInstance1 from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        post: [],
        selectedPostId: null,
        error: false
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
                this.setState({error: true});
            }) //error handler
    }

    postSelectorHandler = (id) => {
        this.setState({selectedPostId : id})
    }

    render () {
        //default return element
        let post = <p style={{textAlign:'center'}}>Something went wrong.</p>;

        //check for error from server
        if(!this.state.error) {
            post = this.state.post.map(post => {
                return <Post 
                key={post.id} 
                title={post.title} 
                author={post.author}
                clicked={() => this.postSelectorHandler(post.id)}/>
            });
        }

        return (
            <div>
                <section className="Posts">
                    {post}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;