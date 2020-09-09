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

const DynamicFinalForm = (props) => {
  const [dynamicFinalForm, setDynamicFinalForm] = useState({
    StrippingRatio: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Stripping Ratio",
      },
      id: "Stripping-Ratio",
      value: "",
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
    MinOreDesiredPerPeriod: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Minimum Ore Desired Per Period",
      },
      id: "Min-Ore-Period",
      value: "",
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
    ReadyTrucks: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Ready To Use Trucks",
      },
      id: "Ready-Trucks",
      value: "",
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
    PeriodDuration: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Duration Of One Period",
      },
      id: "Period-Duration",
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
    setDynamicFinalForm({
      ...dynamicFinalForm,
      [inputIdentifier]: {
        ...dynamicFinalForm.inputIdentifier,
        value: event.target.value,
      },
    });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in dynamicFinalForm) {
      formData[formElementIdentifier] =
        dynamicFinalForm[formElementIdentifier].value;
    }

    console.log(formData);
    const dynamicFinal = {
      dynamicFinalData: formData,
    };
    props.onSubmitInput(dynamicFinal, props.token);
  };

  let form = (
    <form onSubmit={formSubmitHandler}>
      <div className="row mt-4">
        <div className="col-12">
          <TextField
            className="w-100"
            {...dynamicFinalForm.StrippingRatio.elementConfig}
            value={dynamicFinalForm.StrippingRatio.value}
            onChange={(event) => inputChangedHandler(event, "StrippingRatio")}
          ></TextField>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <TextField
            className="w-100"
            {...dynamicFinalForm.MinOreDesiredPerPeriod.elementConfig}
            value={dynamicFinalForm.MinOreDesiredPerPeriod.value}
            onChange={(event) =>
              inputChangedHandler(event, "MinOreDesiredPerPeriod")
            }
          ></TextField>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <TextField
            className="w-100"
            {...dynamicFinalForm.ReadyTrucks.elementConfig}
            value={dynamicFinalForm.ReadyTrucks.value}
            onChange={(event) => inputChangedHandler(event, "ReadyTrucks")}
          ></TextField>
        </div>
      </div>{" "}
      <div className="row mt-4">
        <div className="col-12">
          <TextField
            className="w-100"
            {...dynamicFinalForm.PeriodDuration.elementConfig}
            value={dynamicFinalForm.PeriodDuration.value}
            onChange={(event) => inputChangedHandler(event, "PeriodDuration")}
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
    onSubmitInput: (dynamicFinalData, token) =>
      dispatch(actions.submitDynamicFinalInputs(dynamicFinalData, token)),
  };
};

export default connect(null, mapDispatchToProps)(DynamicFinalForm);
