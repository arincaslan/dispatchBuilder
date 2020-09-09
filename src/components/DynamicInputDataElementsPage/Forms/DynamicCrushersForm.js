import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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

const DynamicCrushersForm = (props) => {
  const dynamicNodes = useSelector(
    (state) => state.dynamicNodesReducer.dynamicNodes
  );
  const dynamicCrusherNodes = [];
  for (let i = 0; i < dynamicNodes.length; i++) {
    if (dynamicNodes[i]["DynamicNodeType"] === "Crusher") {
      dynamicCrusherNodes.push(dynamicNodes[i]);
    }
  }
  useEffect(() => {
    console.log(dynamicCrusherNodes);
    for (let i = 0; i < dynamicCrusherNodes.length; i++) {
      setDynamicCrushersForm((prev) => ({
        ...prev,
        DynamicCrusherNodes: {
          ...dynamicCrusherNodes,
          elementConfig: {
            options: dynamicCrusherNodes.map((dynamicCrusherNode) => ({
              value: dynamicCrusherNode.DynamicNodes,
              displayValue: dynamicCrusherNode.DynamicNodes,
            })),
          },
          value: dynamicCrusherNodes[i]["DynamicNodes"].value
            ? dynamicCrusherNodes[i]["DynamicNodes"].value
            : dynamicCrusherNodes[0] && dynamicCrusherNodes[0]["DynamicNodes"],
        },
      }));
    }
  }, [dynamicNodes]);

  const [dynamicCrushersForm, setDynamicCrushersForm] = useState({
    DynamicCrusherNodes: {
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
    DynamicCrusherTonneCost: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Crusher remained tonne.",
      },
      id: "crusher-tonne",
      value: "",
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
    DynamicCrusherMaximumCapacity: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Enter the maximum capacity of this crusher.",
      },
      id: "crusher-max-capacity",
      value: "",
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangedHandler = (event, inputIdentifier) => {
    setDynamicCrushersForm({
      ...dynamicCrushersForm,
      [inputIdentifier]: {
        ...dynamicCrushersForm.inputIdentifier,
        value: event.target.value,
      },
    });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in dynamicCrushersForm) {
      formData[formElementIdentifier] =
        dynamicCrushersForm[formElementIdentifier].value;
    }

    console.log(formData);
    const dynamicCrusher = {
      dynamicCrushersData: formData,
    };
    props.onSubmitInput(dynamicCrusher, props.token);
  };

  let form = (
    <form onSubmit={formSubmitHandler}>
      <div className="row mt-4">
        <div className="col-md-12">
          <FormControl className="w-100">
            <InputLabel>Select Crusher</InputLabel>
            <Select
              native
              value={dynamicCrushersForm.DynamicCrusherNodes.value}
              onChange={(e) => inputChangedHandler(e, "DynamicCrusherNodes")}
            >
              {dynamicCrusherNodes.map((dynamicCrusher, index) => (
                <option key={index} value={dynamicCrusher.DynamicNodes}>
                  {dynamicCrusher.DynamicNodes}
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
            {...dynamicCrushersForm.DynamicCrusherTonneCost.elementConfig}
            value={dynamicCrushersForm.DynamicCrusherTonneCost.value}
            onChange={(event) =>
              inputChangedHandler(event, "DynamicCrusherTonneCost")
            }
          ></TextField>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <TextField
            className="w-100"
            {...dynamicCrushersForm.DynamicCrusherMaximumCapacity.elementConfig}
            value={dynamicCrushersForm.DynamicCrusherMaximumCapacity.value}
            onChange={(event) =>
              inputChangedHandler(event, "DynamicCrusherMaximumCapacity")
            }
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
          Add Data
        </Button>
      </div>
    </form>
  );
  if (props.loading) {
    form = <Spinner></Spinner>;
  }
  return <div>{form}</div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitInput: (dynamicCrushersData, token) =>
      dispatch(actions.submitDynamicCrusherInputs(dynamicCrushersData, token)),
  };
};

export default connect(null, mapDispatchToProps)(DynamicCrushersForm);
