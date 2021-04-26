import React ,{Component} from 'react';
import "./Input.css";

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: (props.locked && props.active) || false
    };
  }

  render() {
    const {locked} = this.props;
    const { active, value, error, label } = this.state;
    const fieldClassName = `field ${(locked ? active : active || value) &&
      "active"} ${locked && !active && "locked"}`;

    return (
        <div className={fieldClassName}>
        <input
          id={1}
          type="text"
          value={this.props.Id}
          onChange={this.props.onChange}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: false })}
          placeholder="Enter Product ID"
        />
        </div>
    );
  }
}