import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import ServerRequest from "./../shared/ServerRequest";
// import ButtonBar from "./../buttons/ButtonBar"
import {Help, QuestionAnswer, MergeTypeSharp} from "@material-ui/icons"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Filter from './Filter/Filter';
import Button from '@material-ui/core/Button';

// import { types } from './../../enums';

//FROM MATERIAL UI
const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  primary: {
    marginRight: theme.spacing(2)
  },
  secondary: {
    background: theme.palette.secondary['100'],
    color: 'white'
  },
  spaceTop: {
    marginTop: 20
  }
});

class FilterList extends Component {
  state = {
    filters: [{attr: "spanId", operation: "eq", value: "", tag: "", isTag: false}],
  };
  componentDidMount() {}

  addFilter = () => {
    this.setState( {filters: this.state.filters.concat([{attr: null, operation: null, value: null, isTag: false, tag: null}])} )
  }

  removeFilter = (index) => {
    this.state.filters.splice(index, 1)
    this.setState ( {filters: this.state.filters} )
  }

  updateFilter = (index, newFilter) => {
    this.state.filters[index] = newFilter
    this.setState( {filters: this.state.filters} )
  }

  buildList(filters) {
    var listItems = filters.map((filter, index) => {
      console.log(filter);
      return (
        <React.Fragment key={index}>
          <ListItem>
            <Filter attr={filter.attr} operation={filter.operation} value={filter.value} isTag={filter.isTag} tag={filter.tag} index={index} updateFilter={this.updateFilter} removeFilter={this.removeFilter}></Filter>
          </ListItem>
        </React.Fragment>
      )
    })
    return (
      <List>
        {listItems}
      </List>
    )
  }

  render() {
    const { classes, updateSpans } = this.props;
    const {filters} = this.state 
    return (
      <Grid item xs={12} md={6}>
        <Typography variant="h6" className={classes.title}>
          Filter spans!
        </Typography>
        <div className={classes.demo}>
          <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.primary}
              onClick={this.addFilter}
            >
              Add Filter
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.primary}
              onClick={() => updateSpans(filters)}
            >
              Submit
            </Button>
          </div>
          {this.buildList(filters)}
        </div>
      </Grid>
    )
  }
}

export default withStyles(styles)(FilterList);