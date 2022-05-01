import React from "react";
import HomeList from "./Homelist";
import Search from "./Search";

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      type: 0,
    };
    this.content = [<HomeList />, <Search />];
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={() => this.setState({ type: 0 })}>home</button>
          <button onClick={() => this.setState({ type: 1 })}>search</button>
        </div>
        <div>{this.content[this.state.type]}</div>
      </div>
    );
  }
}

export default Homepage;
