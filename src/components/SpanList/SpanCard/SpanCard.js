import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import withStyles from "@material-ui/styles/withStyles";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import { types } from './../enums';

//FROM MATERIAL UI
const styles = theme => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class SpanCard extends Component {
  state = {
    isHidden: true
  }

  render() {
    const {span, isHidden, classes} = this.props;

    const tagsContent = span.tags.map((tag) => {
      var tagKeys = Object.keys(tag)
      var otherTag = tagKeys[1]
      return <Typography variant="body2" component="p" key={tag.key}>
          {tag.key}: {tag[otherTag]}
      </Typography>
    });

    return (
      <Card className={classes.root} variant="outlined" hidden={isHidden}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
          {/* Operation Name: {span.operationName} */}
          </Typography>
          <Typography variant="h5" component="h2">
          Operation Name: {span.operationName}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
          DateTime: {new Date(span.startTime).toISOString()} - {new Date(span.endTime).toISOString()}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Span Parent Id:{span.parentSpanId}
          </Typography>
          <Typography variant="body2" component="h3">
            <Typography variant="body2" component="p">
                {tagsContent}
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(SpanCard);