import React, { Component } from "react";
import config from "../../config.json";
const { SERVER_API } = config;
class ProductAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "",
        price: 0,
      },
    };
  }
  handleChange = (e) => {
    const data = { ...this.state.form };
    data[e.target.name] = e.target.value;
    this.setState({
      form: data,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, price } = this.state.form;
    this.postProduct({ name, price });
  };
  postProduct = async (data) => {
    const response = await fetch(`${SERVER_API}/Posts`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      this.props.onSuccess(true);
      alert("them san pham thanh cong ");
      this.setState({
        form: {
          name: "",
          price: 0,
        },
      });
    }
  };
  render() {
    const { name, price } = this.state.form;
    return (
      <div>
        <form action="" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name"> nhập name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="nhập name..."
              onChange={this.handleChange}
              value={name}
              required
            />
            <br />
            <label htmlFor="price"> nhập price:</label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="nhập price..."
              onChange={this.handleChange}
              min={0}
              value={price}
              required
            />
            <br />
            <button type="submit">thêm</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ProductAdd;
