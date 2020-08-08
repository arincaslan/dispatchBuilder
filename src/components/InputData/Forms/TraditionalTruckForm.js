import React, { useState, useEffect } from "react";
import classes from "./TraditionalTruckForm.module.css";
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

const TraditionalTruckForm = (props) => {

  const [traditionalTruckForm, setTraditionalTruckForm] = useState({
    YearlyStrippingRate: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Yearly Stripping Rate",
      },
      id: 'YSR',
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
    },
    BucketStuffingFactor: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Bucket Stuffing Factor",
      },
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
    },
    WorkplaceEfficiency: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Workplace Efficiency",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    RockSwellFactor: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Rock Swell Factor",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    BucketPeriod: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Bucket Period",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    BucketVolume: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Bucket Volume",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    TruckTonnage: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Truck Tonnage",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    MaterialDensity: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Material Density",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    SoilBlisteringFactor: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Soil Blistering Factor",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    UnloadingTime: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Unloading Time",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    MeanTravelTime: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Mean Travel Time",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    DriverFactor: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Driver Factor",
      },
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
    setTraditionalTruckForm({
      ...traditionalTruckForm,
      [inputIdentifier]: {
        ...traditionalTruckForm.inputIdentifier,
        value: event.target.value,
      },
    });
    setFormIsValid(formIsValid);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in traditionalTruckForm) {
      formData[formElementIdentifier] = traditionalTruckForm[formElementIdentifier].value;
    }


    const traditionalTruckData = {
      truckData: formData,
    };
    props.onSubmitInput(traditionalTruckData, props.token);
  };

  let form = (
    <form onSubmit={formSubmitHandler}>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <TextField
            className="w-100"
            {...traditionalTruckForm.YearlyStrippingRate.elementConfig}
            value={traditionalTruckForm.YearlyStrippingRate.value}
            onChange={(event) => inputChangedHandler(event, "YearlyStrippingRate")}
          ></TextField>
        </div>
        <div className="col-md-6 col-sm-12">
          <TextField
            className="w-100"
            {...traditionalTruckForm.BucketStuffingFactor.elementConfig}
            value={traditionalTruckForm.BucketStuffingFactor.value}
            onChange={(event) => inputChangedHandler(event, "BucketStuffingFactor")}
          ></TextField>
        </div>
        <div className="col-md-6 col-sm-12">
          <TextField
            className="w-100"
            {...traditionalTruckForm.WorkplaceEfficiency.elementConfig}
            value={traditionalTruckForm.WorkplaceEfficiency.value}
            onChange={(event) => inputChangedHandler(event, "WorkplaceEfficiency")}
          ></TextField>
        </div>
        <div className="col-md-6 col-sm-12">
          <TextField
            className="w-100"
            {...traditionalTruckForm.RockSwellFactor.elementConfig}
            value={traditionalTruckForm.RockSwellFactor.value}
            onChange={(event) => inputChangedHandler(event, "RockSwellFactor")}
          ></TextField>
        </div>
        <div className="col-md-6 col-sm-12">
          <TextField
            className="w-100"
            {...traditionalTruckForm.BucketPeriod.elementConfig}
            value={traditionalTruckForm.BucketPeriod.value}
            onChange={(event) => inputChangedHandler(event, "BucketPeriod")}
          ></TextField>
        </div>
        <div className="col-md-6 col-sm-12">
          <TextField
            className="w-100"
            {...traditionalTruckForm.BucketVolume.elementConfig}
            value={traditionalTruckForm.BucketVolume.value}
            onChange={(event) => inputChangedHandler(event, "BucketVolume")}
          ></TextField>
        </div>
        <div className="col-md-6 col-sm-12">
          <TextField
            className="w-100"
            {...traditionalTruckForm.TruckTonnage.elementConfig}
            value={traditionalTruckForm.TruckTonnage.value}
            onChange={(event) => inputChangedHandler(event, "TruckTonnage")}
          ></TextField>
        </div>
        <div className="col-md-6 col-sm-12">
          <TextField
            className="w-100"
            {...traditionalTruckForm.MaterialDensity.elementConfig}
            value={traditionalTruckForm.MaterialDensity.value}
            onChange={(event) => inputChangedHandler(event, "MaterialDensity")}
          ></TextField>
        </div>
        <div className="col-md-6 col-sm-12">
          <TextField
            className="w-100"
            {...traditionalTruckForm.SoilBlisteringFactor.elementConfig}
            value={traditionalTruckForm.SoilBlisteringFactor.value}
            onChange={(event) => inputChangedHandler(event, "SoilBlisteringFactor")}
          ></TextField>
        </div>
        <div className="col-md-6 col-sm-12">
          <TextField
            className="w-100"
            {...traditionalTruckForm.UnloadingTime.elementConfig}
            value={traditionalTruckForm.UnloadingTime.value}
            onChange={(event) => inputChangedHandler(event, "UnloadingTime")}
          ></TextField>
        </div>
        <div className="col-md-6 col-sm-12">
          <TextField
            className="w-100"
            {...traditionalTruckForm.MeanTravelTime.elementConfig}
            value={traditionalTruckForm.MeanTravelTime.value}
            onChange={(event) => inputChangedHandler(event, "MeanTravelTime")}
          ></TextField>
        </div>
        <div className="col-md-6 col-sm-12">
          <TextField
            className="w-100"
            {...traditionalTruckForm.DriverFactor.elementConfig}
            value={traditionalTruckForm.DriverFactor.value}
            onChange={(event) => inputChangedHandler(event, "DriverFactor")}
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
  return <div className={classes.TraditionalTruckForm}>{form}</div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitInput: (truckData, token) =>
      dispatch(actions.submitTruckInputs(truckData, token)),
  };
};

export default connect(null, mapDispatchToProps)(TraditionalTruckForm);
