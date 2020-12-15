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
import SpanCard from './SpanCard/SpanCard';
import Button from '@material-ui/core/Button';
import FilterList from './../FilterList/FilterList'
var qs = require('qs');

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

class SpanList extends Component {
  state = {
    spans: [],
    loading: true,
    opennedBox: {type: null, span: {word: null}, isOpen: false, performClose: false},
    // lastOpennedBox: {type: null, word: {word: null}}
  };
  componentDidMount() {
    this.getSpansFromServer();
  }

  getSpansFromServer = (filters) => {
    return Promise.resolve(()=>{
      this.setState( {loading: true} )
    })
    .then(() => {
      var params = {};
      if (!filters) {
        filters = []
      }
      filters.map(filter=>{
        if (filter.isTag) {
          params[filter.tag] = JSON.stringify([filter.value, filter.operation, filter.isTag])
        }
        else {
          params[filter.attr] = JSON.stringify([filter.value,filter.operation,filter.isTag])
        }
      })
      console.log(params)
      console.log(filters)
      return ServerRequest("get", "spans", {params: params})
    })
    .then(spans => this.setState( {spans: spans, loading: false} ))
  }

  toggleSpanDetails(span) {
    if (this.state.opennedBox.span.spanId == span.spanId && this.state.opennedBox.isOpen == true) {
      this.setState({opennedBox: {span: {span: null}, isOpen: false, performClose: true}})
    }
    else {
      this.setState({opennedBox: {span: span, isOpen: true, performClose: false}})
    }
  }

  buildList(spans, opennedBox, classes) {
    var listItems = spans.map((span) => {
      // console.log(span);
      return (
        <React.Fragment key={span.spanId}>
          <ListItem>
            <ListItemText
              primary={`Span with id: ${span.spanId}`}
              // secondary={secondary ? 'Secondary text' : null}
            />
            <ListItemSecondaryAction>
            <div>
              <Button
                variant="contained"
                color="primary"
                className={classes.primary}
                onClick={() => {this.toggleSpanDetails(span)}}
              >
                Show Details
              </Button>
            </div>
            </ListItemSecondaryAction>
          </ListItem>
          <SpanCard span={span} isHidden={(opennedBox.span.spanId == span.spanId) && !this.state.opennedBox.performClose ? false : true}></SpanCard>
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
    const { classes } = this.props;
    const {spans, loading, opennedBox} = this.state 
    return (
      <React.Fragment>
        <Grid
          spacing={4}
          alignItems="center"
          justify="center"
          container
          className={classes.grid}
        >
          <FilterList updateSpans={this.getSpansFromServer}></FilterList>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Filter spans!
          </Typography>
          <div className={classes.demo}>
              {loading ? <a>Loading...</a> :
              this.buildList(spans, opennedBox, classes)
              }
          </div>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(SpanList);