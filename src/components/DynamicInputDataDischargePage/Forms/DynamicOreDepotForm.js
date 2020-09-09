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

const DynamicOreDepotForm = (props) => {
  const dynamicNodes = useSelector(
    (state) => state.dynamicNodesReducer.dynamicNodes
  );
  const dynamicOreDepotNodes = [];
  for (let i = 0; i < dynamicNodes.length; i++) {
    if (dynamicNodes[i]["DynamicNodeType"] === "Ore") {
      dynamicOreDepotNodes.push(dynamicNodes[i]);
    }
  }
  useEffect(() => {
    console.log(dynamicOreDepotNodes);
    for (let i = 0; i < dynamicOreDepotNodes.length; i++) {
      setDynamicOreDepotsForm((prev) => ({
        ...prev,
        DynamicOreDepotNodes: {
          ...dynamicOreDepotNodes,
          elementConfig: {
            options: dynamicOreDepotNodes.map((dynamicOreDepotNode) => ({
              value: dynamicOreDepotNode.DynamicNodes,
              displayValue: dynamicOreDepotNode.DynamicNodes,
            })),
          },
          value: dynamicOreDepotNodes[i]["DynamicNodes"].value
            ? dynamicOreDepotNodes[i]["DynamicNodes"].value
            : dynamicOreDepotNodes[0] &&
              dynamicOreDepotNodes[0]["DynamicNodes"],
        },
      }));
    }
  }, [dynamicNodes]);

  const [dynamicOreDepotsForm, setDynamicOreDepotsForm] = useState({
    DynamicOreDepotNodes: {
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
    DynamicOreDepotReloadCost: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Ore Depot reload cost.",
      },
      id: "OreDepot-tonne",
      value: "",
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
    UpperLimitOreGrade: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Upper Limit Ore Grade.",
      },
      id: "OreGrade-UpperLimit",
      value: "",
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
    MeanOreGrade: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Mean Ore Grade.",
      },
      id: "OreGrade-mean",
      value: "",
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
    LowerLimitOreGrade: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Lower Limit Ore Grade.",
      },
      id: "OreGrade-LowerLimit",
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
    setDynamicOreDepotsForm({
      ...dynamicOreDepotsForm,
      [inputIdentifier]: {
        ...dynamicOreDepotsForm.inputIdentifier,
        value: event.target.value,
      },
    });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in dynamicOreDepotsForm) {
      formData[formElementIdentifier] =
        dynamicOreDepotsForm[formElementIdentifier].value;
    }

    console.log(formData);
    const dynamicOreDepot = {
      dynamicOreDepotsData: formData,
    };
    props.onSubmitInput(dynamicOreDepot, props.token);
  };

  let form = (
    <form onSubmit={formSubmitHandler}>
      <div className="row mt-4">
        <div className="col-md-12">
          <FormControl className="w-100">
            <InputLabel>Select Ore Depot</InputLabel>
            <Select
              native
              value={dynamicOreDepotsForm.DynamicOreDepotNodes.value}
              onChange={(e) => inputChangedHandler(e, "DynamicOreDepotNodes")}
            >
              {dynamicOreDepotNodes.map((dynamicOreDepot, index) => (
                <option key={index} value={dynamicOreDepot.DynamicNodes}>
                  {dynamicOreDepot.DynamicNodes}
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
            {...dynamicOreDepotsForm.DynamicOreDepotReloadCost.elementConfig}
            value={dynamicOreDepotsForm.DynamicOreDepotReloadCost.value}
            onChange={(event) =>
              inputChangedHandler(event, "DynamicOreDepotReloadCost")
            }
          ></TextField>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <TextField
            className="w-100"
            {...dynamicOreDepotsForm.UpperLimitOreGrade.elementConfig}
            value={dynamicOreDepotsForm.UpperLimitOreGrade.value}
            onChange={(event) =>
              inputChangedHandler(event, "UpperLimitOreGrade")
            }
          ></TextField>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <TextField
            className="w-100"
            {...dynamicOreDepotsForm.MeanOreGrade.elementConfig}
            value={dynamicOreDepotsForm.MeanOreGrade.value}
            onChange={(event) => inputChangedHandler(event, "MeanOreGrade")}
          ></TextField>
        </div>
      </div>{" "}
      <div className="row mt-4">
        <div className="col-12">
          <TextField
            className="w-100"
            {...dynamicOreDepotsForm.LowerLimitOreGrade.elementConfig}
            value={dynamicOreDepotsForm.LowerLimitOreGrade.value}
            onChange={(event) =>
              inputChangedHandler(event, "LowerLimitOreGrade")
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
    onSubmitInput: (dynamicOreDepotsData, token) =>
      dispatch(
        actions.submitDynamicOreDepotInputs(dynamicOreDepotsData, token)
      ),
  };
};

export default connect(null, mapDispatchToProps)(DynamicOreDepotForm);
