import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./PathsForm.module.css";
// import Button from "../../UI/Button/Button";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

import Spinner from "../../UI/Spinner/Spinner";
import Input from "../../UI/Input/Input";
import { updateObject, checkValidity } from "../../../shared/utility";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

const PathsData = (props) => {
  const nodes = useSelector((state) => state.nodesReducer.nodes);

  useEffect(() => {
    setPathForm((prev) => ({
      ...prev,
      FirstNode: {
        ...prev.FirstNode,
        elementConfig: {
          options: nodes.map((node) => ({
            value: node.Nodes,
            displayValue: node.Nodes,
          })),
        },
        value: prev.FirstNode.value
          ? prev.FirstNode.value
          : nodes[0] && nodes[0].Nodes,
      },
      SecondNode: {
        ...prev.SecondNode,
        elementConfig: {
          options: nodes.map((node) => ({
            value: node.Nodes,
            displayValue: node.Nodes,
          })),
        },
        value: prev.SecondNode.value
          ? prev.SecondNode.value
          : nodes[0] && nodes[0].Nodes,
      },
    }));
  }, [nodes]);

  const [pathForm, setPathForm] = useState({
    FirstNode: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "", displayValue: "" },
          { value: "", displayValue: "" },
        ],
      },
      value: "",
      validation: {},
      valid: true,
    },
    SecondNode: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "", displayValue: "" },
          { value: "", displayValue: "" },
        ],
      },
      value: "",
      validation: {},
      valid: true,
    },
    TimeBetweenNodes: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder:
          "Give the average time spend between nodes in minutes. Exmp:5",
      },
      id: "node-btw-time",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangedHandler = (event, inputIdentifier) => {
    // const updatedFormElement = updateObject(pathForm[inputIdentifier], {
    //   value: event.target.value,
    //   valid: checkValidity(
    //     event.target.value,
    //     pathForm[inputIdentifier].validation
    //   ),
    //   touched: true,
    // });

    // const updatedPathForm = updateObject(pathForm, {
    //   [inputIdentifier]: updatedFormElement,
    // });

    // let formIsValid = true;
    // for (let inputIdentifier in updatedPathForm) {
    //   formIsValid = updatedPathForm[inputIdentifier].valid && formIsValid;
    // }
    // setPathForm(updatedPathForm);
    // setFormIsValid(formIsValid);

    setPathForm({
      ...pathForm,
      [inputIdentifier]: {
        ...pathForm.inputIdentifier,
        value: event.target.value,
      },
    });
  };

  // const formElementsArray = [];
  // for (let key in pathForm) {
  //   formElementsArray.push({
  //     id: key,
  //     config: pathForm[key],
  //   });
  // }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in pathForm) {
      formData[formElementIdentifier] = pathForm[formElementIdentifier].value;
    }

    console.log(formData);
    const path = {
      pathData: formData,
    };
    props.onSubmitInput(path, props.token);
  };

  let form = (
    <form onSubmit={formSubmitHandler}>
      <div className="row mt-4">
        <div className="col-md-6">
          <FormControl className="w-100">
            <InputLabel>First Node</InputLabel>
            <Select
              native
              value={pathForm.FirstNode.value}
              onChange={(e) => inputChangedHandler(e, "FirstNode")}
            >
              {nodes.map((node, index) => (
                <option key={index} value={node.Nodes}>
                  {node.Nodes}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-md-6 col-sm-12">
          <FormControl className="w-100">
            <InputLabel>Second Node</InputLabel>
            <Select
              native
              value={pathForm.SecondNode.value}
              onChange={(e) => inputChangedHandler(e, "SecondNode")}
            >
              {nodes.map((node, index) => (
                <option key={index} value={node.Nodes}>
                  {node.Nodes}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <TextField
            className="w-100"
            {...pathForm.TimeBetweenNodes.elementConfig}
            value={pathForm.TimeBetweenNodes.value}
            onChange={(event) => inputChangedHandler(event, "TimeBetweenNodes")}
          ></TextField>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <Button
          type="submit"
          className="mt-5"
          variant="contained"
          color="primary"
        >
          Add Path
        </Button>
      </div>
    </form>
  );
  if (props.loading) {
    form = <Spinner></Spinner>;
  }
  return <>{form}</>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitInput: (pathData, token) =>
      dispatch(actions.submitPathInputs(pathData, token)),
  };
};

export default connect(null, mapDispatchToProps)(PathsData);
