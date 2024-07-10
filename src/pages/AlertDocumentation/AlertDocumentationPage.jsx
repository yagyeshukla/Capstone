import React, { useState, useEffect } from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import { CSVLink } from "react-csv";
import { formatDate, formatTime } from "../../utils/helper";
import styles from "./AlertDocumentationPage.module.scss";

import { Button, Form, Input, DatePicker, Table } from "antd";
import {
  DownloadOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const AlertDocumentationPage = () => {
  const { alertId } = useParams();
  const [incidents, setIncidents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [incidentDetails, setIncidentDetails] = useState(null);

  useEffect(() => {
    const storedIncident = localStorage.getItem(`PPE Violation ${alertId}`);
    if (storedIncident) {
      setIncidentDetails(JSON.parse(storedIncident));
    }
  }, [alertId]);

  const onSubmit = (data) => {
    setIncidents([...incidents, { ...data, id: incidents.length + 1 }]);
    setShowForm(false);
  };

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Corrective Actions",
      dataIndex: "correctiveActions",
      key: "correctiveActions",
    },
  ];

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Incident Reports", 20, 10);
    incidents.forEach((incident, index) => {
      doc.text(`Incident ${index + 1}:`, 20, 20 + index * 10);
      doc.text(`Description: ${incident.description}`, 20, 30 + index * 10);
      doc.text(`Location: ${incident.location}`, 20, 40 + index * 10);
      doc.text(`Time: ${incident.time}`, 20, 50 + index * 10);
      doc.text(
        `Corrective Actions: ${incident.correctiveActions}`,
        20,
        60 + index * 10
      );
    });
    doc.save("IncidentReports.pdf");
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.header}>Alert Documentation Page</h1>

        {incidentDetails && (
          <div className={styles.incidentContainer}>
            <div className={styles.incidentDetails}>
              <h2>Incident Details</h2>
              <p>
                <strong>Description:</strong>{" "}
                {incidentDetails.json.description.line1}
              </p>
              <p>
                <strong>Event Type:</strong> {incidentDetails.json.event_type}
              </p>
              <p>
                <strong>Violation Type:</strong>{" "}
                {incidentDetails.json.violation_type}
              </p>
              <p>
                <strong>Frame Number:</strong> {incidentDetails.json.frame}
              </p>
              <p>
                <strong>Severity Level:</strong>{" "}
                {incidentDetails.json.severity_level}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {incidentDetails.json.metadata.location}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {`${formatDate(
                  new Date(incidentDetails.json.timestamp)
                )} ${formatTime(new Date(incidentDetails.json.timestamp))}`}
              </p>
            </div>
            <div className={styles.incidentImage}>
              <img src={incidentDetails.frame_url} alt="Incident Frame" />
            </div>
          </div>
        )}

        <Button
          className={styles.createButton}
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowForm(true)}
          size="large"
        >
          Create Incident Report
        </Button>

        {showForm && (
          <div className={styles.formContainer}>
            <Form className={styles.form} layout="vertical" onFinish={onSubmit}>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input the description!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Location"
                name="location"
                rules={[
                  { required: true, message: "Please input the location!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Time"
                name="time"
                rules={[{ required: true, message: "Please select the time!" }]}
              >
                <DatePicker showTime />
              </Form.Item>
              <Form.Item
                label="Corrective Actions"
                name="correctiveActions"
                rules={[
                  {
                    required: true,
                    message: "Please input corrective actions!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <div className={styles.formButtons}>
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={() => setShowForm(false)}
                  size="large"
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  icon={<PlusOutlined />}
                >
                  Add Incident
                </Button>
              </div>
            </Form>
          </div>
        )}

        <h2>Incident Reports</h2>
        <div className={styles.tableContainer}>
          <Table
            columns={columns}
            dataSource={incidents}
            rowKey={(record) => record.id}
          />
        </div>

        <div className={styles.exportButtons}>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            size="large"
            onClick={generatePDF}
          >
            Download as PDF
          </Button>
          <Button type="primary" icon={<DownloadOutlined />} size="large">
            <CSVLink
              data={incidents}
              headers={columns.map((col) => ({
                label: col.title,
                key: col.dataIndex,
              }))}
            >
              Download as CSV
            </CSVLink>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AlertDocumentationPage;
