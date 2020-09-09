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

const DynamicShowelsForm = (props) => {
  const dynamicNodes = useSelector(
    (state) => state.dynamicNodesReducer.dynamicNodes
  );
  const dynamicShowelNodes = [];
  for (let i = 0; i < dynamicNodes.length; i++) {
    if (dynamicNodes[i]["DynamicNodeType"] === "Showel") {
      dynamicShowelNodes.push(dynamicNodes[i]);
    }
  }
  useEffect(() => {
    console.log(dynamicShowelNodes);
    for (let i = 0; i < dynamicShowelNodes.length; i++) {
      setDynamicShowelsForm((prev) => ({
        ...prev,
        DynamicShowelNodes: {
          ...dynamicShowelNodes,
          elementConfig: {
            options: dynamicShowelNodes.map((dynamicShowelNode) => ({
              value: dynamicShowelNode.DynamicNodes,
              displayValue: dynamicShowelNode.DynamicNodes,
            })),
          },
          value: dynamicShowelNodes[i]["DynamicNodes"].value
            ? dynamicShowelNodes[i]["DynamicNodes"].value
            : dynamicShowelNodes[0] && dynamicShowelNodes[0]["DynamicNodes"],
        },
      }));
    }
  }, [dynamicNodes]);

  const [dynamicShowelsForm, setDynamicShowelsForm] = useState({
    DynamicShowelNodes: {
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
    DynamicShowelTonneCost: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Showel remained tonne.",
      },
      id: "showel-tonne",
      value: "",
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
    DynamicShowelLoadingCapacity: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Enter the loading capacity of this showel.",
      },
      id: "showel-load-capacity",
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
    setDynamicShowelsForm({
      ...dynamicShowelsForm,
      [inputIdentifier]: {
        ...dynamicShowelsForm.inputIdentifier,
        value: event.target.value,
      },
    });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in dynamicShowelsForm) {
      formData[formElementIdentifier] =
        dynamicShowelsForm[formElementIdentifier].value;
    }

    console.log(formData);
    const dynamicShowel = {
      dynamicShowelsData: formData,
    };
    props.onSubmitInput(dynamicShowel, props.token);
  };

  let form = (
    <form onSubmit={formSubmitHandler}>
      <div className="row mt-4">
        <div className="col-md-12">
          <FormControl className="w-100">
            <InputLabel>Select Showel</InputLabel>
            <Select
              native
              value={dynamicShowelsForm.DynamicShowelNodes.value}
              onChange={(e) => inputChangedHandler(e, "DynamicShowelNodes")}
            >
              {dynamicShowelNodes.map((dynamicShowel, index) => (
                <option key={index} value={dynamicShowel.DynamicNodes}>
                  {dynamicShowel.DynamicNodes}
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
            {...dynamicShowelsForm.DynamicShowelTonneCost.elementConfig}
            value={dynamicShowelsForm.DynamicShowelTonneCost.value}
            onChange={(event) =>
              inputChangedHandler(event, "DynamicShowelTonneCost")
            }
          ></TextField>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <TextField
            className="w-100"
            {...dynamicShowelsForm.DynamicShowelLoadingCapacity.elementConfig}
            value={dynamicShowelsForm.DynamicShowelLoadingCapacity.value}
            onChange={(event) =>
              inputChangedHandler(event, "DynamicShowelLoadingCapacity")
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
    onSubmitInput: (dynamicShowelsData, token) =>
      dispatch(actions.submitDynamicShowelInputs(dynamicShowelsData, token)),
  };
};

export default connect(null, mapDispatchToProps)(DynamicShowelsForm);
