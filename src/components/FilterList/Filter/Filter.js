import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const styles = theme => ({
  margin: {
    margin: theme.spacing(1),
  },
});

class Filter extends Component {
  // const [age, setAge] = React.useState('');
  handleChange = (event, attr, operation = "eq", value, tag, isTag, index, updateFilter) => {
    if (attr == "tag") {
      isTag = true
    }
    else {
      isTag = false
    }
    updateFilter(index, {attr: attr, value: value, operation: operation, tag: tag, isTag: isTag});
  };

  getAllValues = () => {

  }

  render () {
    const {attr, operation, value, tag, isTag, index, classes, updateFilter, removeFilter} = this.props;
    return (
      <div>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-select-native">Attribute</InputLabel>
          <NativeSelect
            id="demo-customized-select-native"
            value={attr}
            defaultValue={"spanId"}
            onChange={(event) => this.handleChange(event, event.target.value, operation, value, tag, isTag, index, updateFilter)}
            input={<BootstrapInput />}
          >
            <option value="spanId">spanId</option>
            <option value="parentSpanId">parentSpanId</option>
            <option value="operationName">operationName</option>
            <option value="startTime">startTime</option>
            <option value="duration">duration</option>
            <option value="endTime">endTime</option>
            <option value="tag">tag</option>
          </NativeSelect>
        </FormControl>
        <FormControl className={classes.margin}>
          <TextField label="Tag" variant="outlined" disabled={!isTag} htmlFor="demo-customized-textbox" onChange={(event) => this.handleChange(event, attr, operation, value, event.target.value, isTag, index, updateFilter)}>Value</TextField>
          {/* <BootstrapInput id="demo-customized-textbox" /> */}
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-select-native">Operation</InputLabel>
          <NativeSelect
            id="demo-customized-select-native"
            value={operation}
            defaultValue={"eq"}
            onChange={(event) => this.handleChange(event, attr, event.target.value, value, tag, isTag, index, updateFilter)}
            input={<BootstrapInput />}
          >
            <option value="eq">Equals To</option>
            <option value="gte">Greater Than or Equal</option>
            <option value="gt">Greater Than</option>
            <option value="lte">Lighter Than or Equal</option>
            <option value="lt">Lighter Than</option>
          </NativeSelect>
        </FormControl>
        <FormControl className={classes.margin}>
          <TextField label="Value" variant="outlined" htmlFor="demo-customized-textbox" onChange={(event) => this.handleChange(event, attr, operation, event.target.value, tag, isTag, index, updateFilter)}>Value</TextField>
          {/* <BootstrapInput id="demo-customized-textbox" /> */}
        </FormControl>
        <Button
          // variant="contained"
          // color="secondary"
          // className={classes.primary}
          onClick={() => removeFilter(index)}
        >
          Remove
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Filter); 