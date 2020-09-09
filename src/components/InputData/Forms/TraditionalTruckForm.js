import React, { useState, useEffect } from "react";
import classes from "./TraditionalTruckForm.module.css";
// import Button from '../../UI/Button/Button';
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";

import Spinner from "../../UI/Spinner/Spinner";
import Input from "../../UI/Input/Input";
import { updateObject, checkValidity } from "../../../shared/utility";
import * as actions from "../../../store/actions/index";
import { connect, useSelector, useDispatch } from "react-redux";

const TraditionalTruckForm = (props) => {
  const dispatch = useDispatch();
  const [traditionalTruckForm, setTraditionalTruckForm] = useState({
    YearlyStrippingRate: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Yearly Stripping Rate",
      },
      id: "YSR",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
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
        required: true,
      },
      valid: false,
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
      formData[formElementIdentifier] =
        traditionalTruckForm[formElementIdentifier].value;
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
          <div className="d-flex align-items-center mt-3">
            <TextField
              {...traditionalTruckForm.YearlyStrippingRate.elementConfig}
              value={traditionalTruckForm.YearlyStrippingRate.value}
              onChange={(event) =>
                inputChangedHandler(event, "YearlyStrippingRate")
              }
              style={{ flexGrow: 1 }}
            ></TextField>
            <Tooltip
              title="Yearly Stripping Rate / Yıllık Dekapaj Oranı"
              placement="top"
            >
              <InfoIcon
                style={{
                  cursor: "pointer",
                  color: "#767676",
                  marginLeft: "5px",
                  marginTop: "7px",
                }}
              />
            </Tooltip>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="d-flex align-items-center mt-3">
            <TextField
              {...traditionalTruckForm.BucketStuffingFactor.elementConfig}
              value={traditionalTruckForm.BucketStuffingFactor.value}
              onChange={(event) =>
                inputChangedHandler(event, "BucketStuffingFactor")
              }
              style={{ flexGrow: 1 }}
            ></TextField>
            <Tooltip
              title="Bucket Stuffing Factor / Kepçe Dolma Faktörü (0.8, 0.9, 1)"
              placement="top"
            >
              <InfoIcon
                style={{
                  cursor: "pointer",
                  color: "#767676",
                  marginLeft: "5px",
                  marginTop: "7px",
                }}
              />
            </Tooltip>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="d-flex align-items-center mt-3">
            <TextField
              {...traditionalTruckForm.WorkplaceEfficiency.elementConfig}
              value={traditionalTruckForm.WorkplaceEfficiency.value}
              onChange={(event) =>
                inputChangedHandler(event, "WorkplaceEfficiency")
              }
              style={{ flexGrow: 1 }}
            ></TextField>
            <Tooltip
              title="Workplace Efficiency / İş Yeri Randımanı (Saatte Fiili Çalışma Süresi)"
              placement="top"
            >
              <InfoIcon
                style={{
                  cursor: "pointer",
                  color: "#767676",
                  marginLeft: "5px",
                  marginTop: "7px",
                }}
              />
            </Tooltip>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="d-flex align-items-center mt-3">
            <TextField
              {...traditionalTruckForm.RockSwellFactor.elementConfig}
              value={traditionalTruckForm.RockSwellFactor.value}
              onChange={(event) =>
                inputChangedHandler(event, "RockSwellFactor")
              }
              style={{ flexGrow: 1 }}
            ></TextField>
            <Tooltip
              title="Rock Swell Factor / Kayaç Kabarma Faktörü"
              placement="top"
            >
              <InfoIcon
                style={{
                  cursor: "pointer",
                  color: "#767676",
                  marginLeft: "5px",
                  marginTop: "7px",
                }}
              />
            </Tooltip>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="d-flex align-items-center mt-3">
            <TextField
              {...traditionalTruckForm.BucketPeriod.elementConfig}
              value={traditionalTruckForm.BucketPeriod.value}
              onChange={(event) => inputChangedHandler(event, "BucketPeriod")}
              style={{ flexGrow: 1 }}
            ></TextField>
            <Tooltip title="Bucket Period / Kepçe Periyodu" placement="top">
              <InfoIcon
                style={{
                  cursor: "pointer",
                  color: "#767676",
                  marginLeft: "5px",
                  marginTop: "7px",
                }}
              />
            </Tooltip>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="d-flex align-items-center mt-3">
            <TextField
              {...traditionalTruckForm.BucketVolume.elementConfig}
              value={traditionalTruckForm.BucketVolume.value}
              onChange={(event) => inputChangedHandler(event, "BucketVolume")}
              style={{ flexGrow: 1 }}
            ></TextField>
            <Tooltip title="Bucket Volume / Kepçe Hacmi" placement="top">
              <InfoIcon
                style={{
                  cursor: "pointer",
                  color: "#767676",
                  marginLeft: "5px",
                  marginTop: "7px",
                }}
              />
            </Tooltip>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="d-flex align-items-center mt-3">
            <TextField
              {...traditionalTruckForm.TruckTonnage.elementConfig}
              value={traditionalTruckForm.TruckTonnage.value}
              onChange={(event) => inputChangedHandler(event, "TruckTonnage")}
              style={{ flexGrow: 1 }}
            ></TextField>
            <Tooltip title="Truck Tonnage / Kamyon Tonajı" placement="top">
              <InfoIcon
                style={{
                  cursor: "pointer",
                  color: "#767676",
                  marginLeft: "5px",
                  marginTop: "7px",
                }}
              />
            </Tooltip>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="d-flex align-items-center mt-3">
            <TextField
              {...traditionalTruckForm.MaterialDensity.elementConfig}
              value={traditionalTruckForm.MaterialDensity.value}
              onChange={(event) =>
                inputChangedHandler(event, "MaterialDensity")
              }
              style={{ flexGrow: 1 }}
            ></TextField>
            <Tooltip
              title="Material Density / Malzeme Yoğunluğu"
              placement="top"
            >
              <InfoIcon
                style={{
                  cursor: "pointer",
                  color: "#767676",
                  marginLeft: "5px",
                  marginTop: "7px",
                }}
              />
            </Tooltip>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="d-flex align-items-center mt-3">
            <TextField
              {...traditionalTruckForm.SoilBlisteringFactor.elementConfig}
              value={traditionalTruckForm.SoilBlisteringFactor.value}
              onChange={(event) =>
                inputChangedHandler(event, "SoilBlisteringFactor")
              }
              style={{ flexGrow: 1 }}
            ></TextField>
            <Tooltip
              title="Soil Blistering Factor / Toprak Kabarma Faktörü"
              placement="top"
            >
              <InfoIcon
                style={{
                  cursor: "pointer",
                  color: "#767676",
                  marginLeft: "5px",
                  marginTop: "7px",
                }}
              />
            </Tooltip>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="d-flex align-items-center mt-3">
            <TextField
              {...traditionalTruckForm.UnloadingTime.elementConfig}
              value={traditionalTruckForm.UnloadingTime.value}
              onChange={(event) => inputChangedHandler(event, "UnloadingTime")}
              style={{ flexGrow: 1 }}
            ></TextField>
            <Tooltip title="Unloading Time / Boşaltma Zamanı" placement="top">
              <InfoIcon
                style={{
                  cursor: "pointer",
                  color: "#767676",
                  marginLeft: "5px",
                  marginTop: "7px",
                }}
              />
            </Tooltip>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="d-flex align-items-center mt-3">
            <TextField
              {...traditionalTruckForm.MeanTravelTime.elementConfig}
              value={traditionalTruckForm.MeanTravelTime.value}
              onChange={(event) => inputChangedHandler(event, "MeanTravelTime")}
              style={{ flexGrow: 1 }}
            ></TextField>
            <Tooltip
              title="Mean Travel Time / Ortalama Yolculuk Süresi"
              placement="top"
            >
              <InfoIcon
                style={{
                  cursor: "pointer",
                  color: "#767676",
                  marginLeft: "5px",
                  marginTop: "7px",
                }}
              />
            </Tooltip>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="d-flex align-items-center mt-3">
            <TextField
              {...traditionalTruckForm.DriverFactor.elementConfig}
              value={traditionalTruckForm.DriverFactor.value}
              onChange={(event) => inputChangedHandler(event, "DriverFactor")}
              style={{ flexGrow: 1 }}
            ></TextField>
            <Tooltip title="Driver Factor / Sürücü Faktörü" placement="top">
              <InfoIcon
                style={{
                  cursor: "pointer",
                  color: "#767676",
                  marginLeft: "5px",
                  marginTop: "7px",
                }}
              />
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <Button
          // disabled={!formIsValid}
          type="submit"
          className="mt-5"
          variant="contained"
          color="primary"
        >
          Add Data
        </Button>
        <Button
          onClick={(id) =>
            dispatch(actions.removeTruck(setTraditionalTruckForm([""])))
          }
          type="submit"
          className="mt-5 ml-2"
          variant="contained"
          color="danger"
        >
          Delete Data
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
