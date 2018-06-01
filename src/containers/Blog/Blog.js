import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        post: [],
        selectedPostId: null
    }

    //component did mount is the best place to perform network request
    componentDidMount() {
        //async
        axios.get('https://jsonplaceholder.typicode.com/posts')
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
            }); //promise for async response
    }

    postSelectorHandler = (id) => {
        this.setState({selectedPostId : id})
    }

    render () {
        const post = this.state.post.map(post => {
            return <Post 
            key={post.id} 
            title={post.title} 
            author={post.author}
            clicked={() => this.postSelectorHandler(post.id)}/>
        });

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