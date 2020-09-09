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

const DynamicPathsCostsForm = (props) => {
  const dynamicPaths = useSelector(
    (state) => state.dynamicPathsReducer.dynamicPaths
  );
  const dynamicTrucks = useSelector(
    (state) => state.dynamicTrucksReducer.dynamicTrucks
  );

  useEffect(() => {
    setDynamicPathCostsForm((prev) => ({
      ...prev,
      DynamicConcatenatedPaths: {
        ...prev.DynamicConcatenatedPaths,
        elementConfig: {
          options: dynamicPaths.map((dynamicPath) => ({
            value: dynamicPath.concatenateDynamicPath,
            displayValue: dynamicPath.concatenateDynamicPath,
          })),
        },
        value: prev.DynamicConcatenatedPaths.value
          ? prev.DynamicConcatenatedPaths.value
          : dynamicPaths[0] && dynamicPaths[0].concatenateDynamicPath,
      },
      DynamicTruckTypes: {
        ...prev.DynamicTruckTypes,
        elementConfig: {
          options: dynamicTrucks.map((dynamicTruck) => ({
            value: dynamicTruck.Trucks,
            displayValue: dynamicTruck.Trucks,
          })),
        },
        value: prev.DynamicTruckTypes.value
          ? prev.DynamicTruckTypes.value
          : dynamicTrucks[0] && dynamicTrucks[0].Trucks,
      },
    }));
  }, [dynamicPaths, dynamicTrucks]);

  const [dynamicPathCostsForm, setDynamicPathCostsForm] = useState({
    DynamicConcatenatedPaths: {
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
    DynamicTruckTypes: {
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
    DynamicTravelCostForPath: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Give the average cost for travel this path.",
      },
      id: "node-btw-time",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    DynamicPathType: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "Loaded", displayValue: "Loaded" },
          { value: "Unloaded", displayValue: "Unloaded" },
        ],
      },
      value: "",
      validation: {},
      valid: true,
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangedHandler = (event, inputIdentifier) => {
    setDynamicPathCostsForm({
      ...dynamicPathCostsForm,
      [inputIdentifier]: {
        ...dynamicPathCostsForm.inputIdentifier,
        value: event.target.value,
      },
    });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in dynamicPathCostsForm) {
      formData[formElementIdentifier] =
        dynamicPathCostsForm[formElementIdentifier].value;
    }

    console.log(formData);
    const dynamicPathCost = {
      dynamicPathCostsData: formData,
    };
    props.onSubmitInput(dynamicPathCost, props.token);
  };

  let form = (
    <form onSubmit={formSubmitHandler}>
      <div className="row mt-4">
        <div className="col-md-6">
          <FormControl className="w-100">
            <InputLabel>Select Path</InputLabel>
            <Select
              native
              value={dynamicPathCostsForm.DynamicConcatenatedPaths.value}
              onChange={(e) =>
                inputChangedHandler(e, "DynamicConcatenatedPaths")
              }
            >
              {dynamicPaths.map((dynamicPath, index) => (
                <option key={index} value={dynamicPath.concatenateDynamicPath}>
                  {dynamicPath.concatenateDynamicPath}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-md-6 col-sm-12">
          <FormControl className="w-100">
            <InputLabel>Select Truck Type</InputLabel>
            <Select
              native
              value={dynamicPathCostsForm.DynamicTruckTypes.value}
              onChange={(e) => inputChangedHandler(e, "DynamicTruckTypes")}
            >
              {dynamicTrucks.map((dynamicTruck, index) => (
                <option key={index} value={dynamicTruck.Trucks}>
                  {dynamicTruck.Trucks}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <FormControl className="w-100">
            <InputLabel htmlFor="age-native-simple">
              Dynamic Path Type
            </InputLabel>
            <Select
              native
              value={dynamicPathCostsForm.DynamicPathType.value}
              onChange={(e) => inputChangedHandler(e, "DynamicPathType")}
            >
              <option value="Loaded">Loaded</option>
              <option value="Unloaded">Unloaded</option>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <TextField
            className="w-100"
            {...dynamicPathCostsForm.DynamicTravelCostForPath.elementConfig}
            value={dynamicPathCostsForm.DynamicTravelCostForPath.value}
            onChange={(event) =>
              inputChangedHandler(event, "DynamicTravelCostForPath")
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
    onSubmitInput: (dynamicPathCostsData, token) =>
      dispatch(
        actions.submitDynamicPathCostsInputs(dynamicPathCostsData, token)
      ),
  };
};

export default connect(null, mapDispatchToProps)(DynamicPathsCostsForm);
