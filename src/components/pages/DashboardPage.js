import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import queryString from 'query-string';
import { withRouter} from 'react-router-dom';
// Semantic UI Components
import { Grid, Button } from "semantic-ui-react";
// Components




class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    }; // 18000000 === 1970-01-01
  }

  componentDidMount() {
    console.log("Dashboard mounted");
    const parsed = queryString.parse(this.props.location.search);
    console.log(parsed)
  }


  logout = () => {
    console.log("Logged out");
    this.props.history.push("/login");
  };

  render() {
    return <Grid style={{ paddingLeft: "0em", paddingRight: "0em" }}>
        <Grid.Row columns={4}>
          <Grid.Column mobile={16} tablet={4} widescreen={2} computer={3}>
            <Button size="small" color="red" content="Salir" icon="sign out" labelPosition="right" onClick={this.logout} fluid />
          </Grid.Column>
        </Grid.Row>
      </Grid>;
  }
}



export default connect(null, {  })(DashboardPage);
