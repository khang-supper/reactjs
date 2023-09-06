import React, { Component } from "react";
import config from "../../config.json";
import ProductDetail from "./ProductDetail";
import ProductAdd from "./ProductAdd";

const { SERVER_API } = config;

class Products extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }
  getPosts = async () => {
    const response = await fetch(`${SERVER_API}/posts?_order=desc&_sort=id`);
    if (response.ok) {
      const posts = await response.json();
      this.setState({
        posts: posts,
      });
    }
  };
  DeletePost = async (id) => {
    const response = await fetch(`${SERVER_API}/posts/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      this.getPosts();
    }
  };

  handleClickPosts = (id) => {
    this.setState({
      postsId: id,
    });
  };
  handleAddSuccess = (Status) => {
    if (Status) {
      this.getPosts();
    }
  };
  handleDelete = (id) => {
    if (window.confirm("ban co chac muon xoa")) {
      this.DeletePost(id);
      alert("xoa thanh cong");
    }
  };

  componentDidMount = () => {
    this.getPosts();
  };

  render() {
    const { posts, postsId } = this.state;
    return (
      <div style={{ margin: "3%" }}>
        <ProductAdd onSuccess={this.handleAddSuccess} />
        {postsId ? (
          <ProductDetail id={postsId} />
        ) : (
          posts.map((posts) => (
            <div key={posts.id}>
              {" "}
              <div
                onClick={() => {
                  this.handleClickPosts(posts.id);
                }}
              >
                {" "}
                {posts.name}
              </div>
              <p>giá:{posts.price}</p>
              <button
                className="button"
                onClick={() => {
                  this.handleDelete(posts.id);
                }}
              >
                xoa
              </button>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Products;
