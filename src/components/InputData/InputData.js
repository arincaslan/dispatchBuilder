import React, { useState, useEffect } from "react";
import NodsForm from "./Forms/NodesForm";
import PathsData from "./Forms/PathsForm";
import NodeCard from "../NodeCard/NodeCard";
import NodesTable from "./Tables/NodesTable";
import PathsTable from "./Tables/PathsTable";

// REDUX
import { useSelector } from "react-redux";
// MATERIAL UI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";

const InputData = (props) => {
  const nodes = useSelector((state) => state.nodesReducer.nodes);

  return (
    <div className="p-4">
      <div className="row">
        <div className="col-12">
          <Paper style={{ padding: "25px" }} elevation={4}>
            <div className="d-flex align-items-center mt-3">
              <Typography variant="h4" gutterBottom>
                Nodes
              </Typography>
              <Tooltip
                title="Bu formu doldurarak maden işletmesindeki elemanları tanımlatabilir ve optimizasyon için burdaki işlem sürelerini belirtebilirsiniz. Nokta türlerini genel olarak üç sınıfa böldük. Showel türü bu maksatla ekskavatörlere karşı gelmektedir. Dump türü döküm alanlarını temsil eder. Crusher türü ise işleme tesislerini temsil etmektedir. Bu faktörleri değerlendirerek formunuzu doğru şekilde doldurunuz. "
                placement="right-end"
              >
                <InfoIcon
                  style={{
                    cursor: "pointer",
                    color: "#767676",
                    marginLeft: "15px",
                    marginBottom: "5px",
                  }}
                />
              </Tooltip>
              <Tooltip
                title="By filling out this form, you can define the mining elements in the mining operation and specify the processing times for optimization here. We've broadly divided the types of points into three classes. Showel type corresponds to excavators for this purpose. Dump type represents dump areas. Crusher type represents processing facilities. Evaluate these factors and fill in your form correctly. "
                placement="right-end"
              >
                <InfoIcon
                  style={{
                    cursor: "pointer",
                    color: "#767676",
                    marginLeft: "15px",
                    marginBottom: "5px",
                  }}
                />
              </Tooltip>
            </div>
            <Typography
              style={{ color: "#767676" }}
              variant="subtitle1"
              className="mb-4"
            >
              Here you can add new nodes and view them in table.
            </Typography>
            <div className="row">
              <div className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                <Paper style={{ padding: "30px", width: "100%" }} elevation={2}>
                  <Typography className="mb-3" variant="h5">
                    Create New Node
                  </Typography>
                  <NodsForm />
                </Paper>
              </div>
              <div className="col-md-6 col-sm-12">
                {/* CONTENT WILL COME HERE (TABLE) */}
                <NodesTable />
              </div>
            </div>
          </Paper>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <Paper style={{ padding: "25px" }} elevation={4}>
            <div className="d-flex align-items-center mt-3">
              <Typography variant="h4" gutterBottom>
                Paths
              </Typography>
              <Tooltip
                title="Bu formda, Nodes formunda belirttiğiniz maden elemanları arasında yollar oluşturacağız. Seçtiğiniz 1. elemandan 2. elemana yolda geçen zamanları belirtiniz. Optimizasyonun sağlıklı gerçekleşmesi için lütfen mantık dışı yolları dahil etmeyiniz. Örneğin bir kamyonun bir ekskavatörden başka bir ekskavatöre gitmesi mantıksız olur. Bu uyaranı dikkate alarak formunuzu optimizasyon için doldurunuz. "
                placement="right-end"
              >
                <InfoIcon
                  style={{
                    cursor: "pointer",
                    color: "#767676",
                    marginLeft: "15px",
                    marginBottom: "5px",
                  }}
                />
              </Tooltip>
              <Tooltip
                title="In this form, we will create paths between the mine elements you specified in the Nodes form. Indicate the time spent on the road from the 1st element to the 2nd element you selected. For a healthy optimization, please do not include unreasonable paths. For example, it would be unreasonable for a truck to go from one excavator to another. Take this warning into consideration and fill in your form for optimization."
                placement="right-end"
              >
                <InfoIcon
                  style={{
                    cursor: "pointer",
                    color: "#767676",
                    marginLeft: "15px",
                    marginBottom: "5px",
                  }}
                />
              </Tooltip>
            </div>
            <Typography
              style={{ color: "#767676" }}
              variant="subtitle1"
              className="mb-4"
            >
              Here you can add new paths and view them in the table.
            </Typography>
            <div className="row">
              <div className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                <Paper style={{ padding: "30px", width: "100%" }} elevation={2}>
                  <Typography className="mb-3" variant="h5">
                    Create New Path
                  </Typography>
                  <PathsData />
                </Paper>
              </div>
              <div className="col-md-6 col-sm-12">
                {/* CONTENT WILL COME HERE (TABLE) */}
                <PathsTable />
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default InputData;
