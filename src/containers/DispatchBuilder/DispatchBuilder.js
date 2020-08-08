import React, { useEffect, useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import solver from "javascript-lp-solver";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DispatchTable from "../../components/InputData/Tables/DispatchTable";
import TraditionalTruckResultTable from "../../components/InputData/Tables/TraditionalTruckResultTable";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const DispatchBuilder = () => {
  const nodes = useSelector((state) => state.nodesReducer.nodes);
  const types = useSelector((state) => state.nodesReducer.types);
  const paths = useSelector((state) => state.pathsReducer.paths);
  const trucks = useSelector((state) => state.trucksReducer.trucks);
  const [truckResults, setTruckResults] = useState();
  const [dispatchResult, setDispatchResult] = useState();

  // RENDER AMCHART ON MOUNT
  useLayoutEffect(() => {
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartdiv", am4charts.RadarChart);

    // Add data
    chart.data = [
      {
        category: "Research",
        value: 80,
        full: 100,
      },
      {
        category: "Marketing",
        value: 35,
        full: 100,
      },
      {
        category: "Distribution",
        value: 92,
        full: 100,
      },
      {
        category: "Human Resources",
        value: 68,
        full: 100,
      },
    ];

    // Make chart not full circle
    chart.startAngle = -90;
    chart.endAngle = 180;
    chart.innerRadius = am4core.percent(20);

    // Set number format
    chart.numberFormatter.numberFormat = "#.#'%'";

    // Create axes
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.fontWeight = 500;
    categoryAxis.renderer.labels.template.adapter.add("fill", function (
      fill,
      target
    ) {
      return target.dataItem.index >= 0
        ? chart.colors.getIndex(target.dataItem.index)
        : fill;
    });
    categoryAxis.renderer.minGridDistance = 10;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;

    // Create series
    var series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.dataFields.valueX = "full";
    series1.dataFields.categoryY = "category";
    series1.clustered = false;
    series1.columns.template.fill = new am4core.InterfaceColorSet().getFor(
      "alternativeBackground"
    );
    series1.columns.template.fillOpacity = 0.08;
    series1.columns.template.cornerRadiusTopLeft = 20;
    series1.columns.template.strokeWidth = 0;
    series1.columns.template.radarColumn.cornerRadius = 20;

    var series2 = chart.series.push(new am4charts.RadarColumnSeries());
    series2.dataFields.valueX = "value";
    series2.dataFields.categoryY = "category";
    series2.clustered = false;
    series2.columns.template.strokeWidth = 0;
    series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
    series2.columns.template.radarColumn.cornerRadius = 20;

    series2.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Add cursor
    chart.cursor = new am4charts.RadarCursor();

    return () => {
      chart.dispose();
    };
  }, []);

  useEffect(() => {
    if (trucks.length) {
      for (let i = 0; i < trucks.length; i++) {
        const excavatorWorkRate =
          (trucks[i]["YearlyStrippingRate"] *
            trucks[i]["BucketStuffingFactor"] *
            3600 *
            trucks[i]["WorkplaceEfficiency"]) /
          (trucks[i]["RockSwellFactor"] * trucks[i]["BucketPeriod"]);
        const excavatorBucketTonnage =
          (trucks[i]["BucketVolume"] * trucks[i]["MaterialDensity"]) /
          trucks[i]["SoilBlisteringFactor"];
        const truckFillTime =
          (trucks[i]["BucketPeriod"] * trucks[i]["TruckTonnage"]) /
          (trucks[i]["BucketStuffingFactor"] * excavatorBucketTonnage);
        const truckWorkRate =
          (3600 *
            trucks[i]["TruckTonnage"] *
            trucks[i]["WorkplaceEfficiency"]) /
          (trucks[i]["UnloadingTime"] +
            trucks[i]["MeanTravelTime"] +
            trucks[i]["DriverFactor"] +
            truckFillTime);
        const numberOfTrucks = excavatorWorkRate / truckWorkRate;

        const traditionalTruckResults = {
          ExcavatorWorkRate: excavatorWorkRate,
          ExcavatorBucketTonnage: excavatorBucketTonnage,
          TruckFillTime: truckFillTime,
          TruckWorkRate: truckWorkRate,
          NumberOfTrucks: numberOfTrucks,
        };
        setTruckResults(traditionalTruckResults);
      }
    }

    if (nodes.length && paths.length) {
      const constraintsVal = {};
      let rateLimitCounter = 1;
      for (let i = 0; i < nodes.length; i++) {
        constraintsVal[`For ${nodes[i]["Nodes"]}`] = { equal: 0 };

        if (nodes[i]["NodeType"] === "Showel") {
          constraintsVal[`rateLimit-${nodes[i]["Nodes"]}`] = {
            equal: 1 / nodes[i]["NodeTime"],
          };
          rateLimitCounter++;
        }
      }
      constraintsVal["showel"] = { equal: types["Showel"] };

      const variablesVal = {};
      let variableLimitCounter = 1;
      for (let i = 0; i < paths.length; i++) {
        variablesVal[paths[i]["concatenatePath"]] = {
          trucks:
            nodes.find((item) => item["Nodes"] === paths[i]["SecondNode"])[
              "NodeType"
            ] === "Crusher" ||
            nodes.find((item) => item["Nodes"] === paths[i]["SecondNode"])[
              "NodeType"
            ] === "Dump"
              ? parseInt(
                  nodes.find(
                    (item) => item["Nodes"] === paths[i]["SecondNode"]
                  )["NodeTime"],
                  10
                ) + parseInt(paths[i]["TimeBetweenNodes"], 10)
              : parseInt(paths[i]["TimeBetweenNodes"], 10),
          [`For ${paths[i]["FirstNode"]}`]: -1,
          [`For ${paths[i]["SecondNode"]}`]: 1,
          ...(nodes.find((item) => item["Nodes"] === paths[i]["SecondNode"])[
            "NodeType"
          ] === "Crusher" ||
          nodes.find((item) => item["Nodes"] === paths[i]["SecondNode"])[
            "NodeType"
          ] === "Dump"
            ? { [`rateLimit-${paths[i]["FirstNode"]}`]: 1 }
            : {}),
        };
        if (
          nodes.find((item) => item["Nodes"] === paths[i]["FirstNode"])[
            "NodeType"
          ] === "Showel"
        ) {
          variableLimitCounter++;
        }
      }

      const newModel = {
        optimize: "trucks",
        opType: "min",
        constraints: {
          ...constraintsVal,
        },
        variables: {
          ...variablesVal,
          showels: {
            trucks: 1,
            showel: 1,
          },
        },
      };
      console.log("newModel", newModel);
      const results = solver.Solve(newModel);
      console.log(results);
      setDispatchResult(results);
    }
  }, [nodes, paths, types, trucks]);

  return (
    <div className="p-3">
      <div className="row">
        <div className="col-12">
          <Paper style={{ padding: "25px" }} elevation={4}>
            <Typography variant="h4" gutterBottom>
              Dispatch Results
            </Typography>
            <Typography
              style={{ color: "#767676" }}
              variant="subtitle1"
              className="mb-4"
            >
              Here you can view the optimal solution of given paths.
            </Typography>

            <div className="row">
              <div className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                <Paper style={{ padding: "30px", width: "100%" }} elevation={2}>
                  <Typography className="mb-3" variant="h5">
                    General Information
                  </Typography>
                  <Typography
                    style={{ color: "#767676", fontSize: "15px" }}
                    variant="subtitle1"
                    className="mb-4"
                  >
                    Global optimal solution has been found.
                  </Typography>
                  <div
                    style={{ width: "300px" }}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <p style={{ width: "100px" }}>Trucks</p>
                    <p
                      className="pr-1"
                      style={{ fontWeight: 300, color: "#767676" }}
                    >
                      {dispatchResult && dispatchResult.result}
                    </p>
                  </div>
                  <div
                    style={{ width: "300px" }}
                    className="d-flex justify-content-between align-items-center mb-3"
                  >
                    <p className="mb-0" style={{ width: "100px" }}>
                      Feasible
                    </p>

                    {dispatchResult && dispatchResult.feasible ? (
                      <CheckCircleIcon color="primary" />
                    ) : (
                      <CancelIcon color="error" />
                    )}
                  </div>
                  <div
                    style={{ width: "300px" }}
                    className="d-flex justify-content-between align-items-center mb-3"
                  >
                    <p className="mb-0" style={{ width: "100px" }}>
                      Bounded
                    </p>

                    {dispatchResult && dispatchResult.bounded ? (
                      <CheckCircleIcon color="primary" />
                    ) : (
                      <CancelIcon color="error" />
                    )}
                  </div>
                </Paper>
              </div>
              <div className="col-md-6 col-sm-12">
                {/* CONTENT WILL COME HERE (TABLE) */}
                <DispatchTable result={dispatchResult} />
              </div>
            </div>
          </Paper>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <Paper style={{ padding: "25px" }} elevation={4}>
            <Typography variant="h4" gutterBottom>
              Traditional Truck Calculator Results
            </Typography>
            <Typography
              style={{ color: "#767676" }}
              variant="subtitle1"
              className="mb-4"
            >
              Here you can view the solution of the equations and number of
              paths.
            </Typography>

            <div className="row">
              <div className="col-md-12 col-sm-12">
                {/* CONTENT WILL COME HERE (TABLE) */}

                <TraditionalTruckResultTable
                  traditionalTruckResults={truckResults}
                />
              </div>
            </div>
          </Paper>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <Paper style={{ padding: "30px", width: "100%" }} elevation={2}>
            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
          </Paper>
        </div>
      </div>
    </div>
  );
};
//
export default DispatchBuilder;
