import React, { Component } from "react";
import config from "../../config.json";

const { SERVER_API } = config;

class Products extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }
  getPosts = async () => {
    const response = await fetch(`${SERVER_API}/posts`);
    if (response.ok) {
      const posts = await response.json();
      this.setState({
        posts: posts,
      });
    }
  };
  componentDidMount = () => {
    this.getPosts();
  };
  render() {
    const { posts } = this.state;
    return (
      <div>
        {posts.map((posts) => (
          <div>
            {" "}
            <h3 key={posts.id}>{posts.name}</h3>
            <p>giá:{posts.price}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Products;
