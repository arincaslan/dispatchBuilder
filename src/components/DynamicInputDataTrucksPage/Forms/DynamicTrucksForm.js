import React, { useState, useEffect } from "react";

// import Button from '../../UI/Button/Button';
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

import Spinner from "../../UI/Spinner/Spinner";
import Input from "../../UI/Input/Input";
import { updateObject, checkValidity } from "../../../shared/utility";
import * as actions from "../../../store/actions/index";
import { connect, useSelector } from "react-redux";

const DynamicTrucksForm = (props) => {
  // const currentTypes = useSelector((state) => state.nodesReducer.types);
  const currentDynamicTrucks = useSelector(
    (state) => state.dynamicTrucksReducer.dynamicTrucks
  );

  const [dynamicTrucksForm, setDynamicTrucksForm] = useState({
    Trucks: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Name Your Truck Type",
      },
      id: "truck-name",
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
    },
    TrucksCapacity: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Truck Capacity",
      },
      id: "truck-capacity",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    TrucksTypeQuantity: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "How many of this kind of trucks will be used",
      },
      id: "truck-quantity",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    DynamicTruckType: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "To Showel", displayValue: "To Showel" },
          { value: "To Crusher", displayValue: "To Crusher" },
          { value: "Same For All", displayValue: "Same For All" },
        ],
      },
      value: "To Showel",
      validation: {},
      valid: true,
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangedHandler = (event, inputIdentifier) => {
    setDynamicTrucksForm({
      ...dynamicTrucksForm,
      [inputIdentifier]: {
        ...dynamicTrucksForm.inputIdentifier,
        value: event.target.value,
      },
    });
    setFormIsValid(formIsValid);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in dynamicTrucksForm) {
      formData[formElementIdentifier] =
        dynamicTrucksForm[formElementIdentifier].value;
    }

    const dynamicTruck = {
      dynamicTruckData: formData,
    };
    props.onSubmitInput(dynamicTruck, props.token);
  };

  let form = (
    <form onSubmit={formSubmitHandler}>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <TextField
            className="w-100"
            {...dynamicTrucksForm.Trucks.elementConfig}
            value={dynamicTrucksForm.Trucks.value}
            onChange={(event) => inputChangedHandler(event, "Trucks")}
          ></TextField>
        </div>
        <div className="col-md-6 col-sm-12">
          <TextField
            className="w-100"
            {...dynamicTrucksForm.TrucksCapacity.elementConfig}
            value={dynamicTrucksForm.TrucksCapacity.value}
            onChange={(event) => inputChangedHandler(event, "TrucksCapacity")}
          ></TextField>
        </div>
      </div>
      <div className="col-md-12 col-sm-12">
        <TextField
          className="w-100 mt-3"
          {...dynamicTrucksForm.TrucksTypeQuantity.elementConfig}
          value={dynamicTrucksForm.TrucksTypeQuantity.value}
          onChange={(event) => inputChangedHandler(event, "TrucksTypeQuantity")}
        ></TextField>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <FormControl className="w-100">
            <InputLabel htmlFor="age-native-simple">Truck Type</InputLabel>
            <Select
              native
              value={dynamicTrucksForm.DynamicTruckType.value}
              onChange={(e) => inputChangedHandler(e, "DynamicTruckType")}
            >
              <option value="To Showel">To Showel</option>
              <option value="To Crusher">To Crusher</option>
              <option value="Same For All">Same For All</option>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <Button
          type="submit"
          className="mt-4"
          variant="contained"
          color="primary"
        >
          Add Truck Type
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
    onSubmitInput: (dynamicTruckData, token) =>
      dispatch(actions.submitDynamicTruckInputs(dynamicTruckData, token)),
  };
};

export default connect(null, mapDispatchToProps)(DynamicTrucksForm);
