import { Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [appt, setAppt] = useState([]);
  const testData = [
    {
      "wochentag": "5",
      "anfangszeit": "840",
      "gebuchtvon": "lehnerdi",
      "datum": "-",
      "dauer": "105",
      "gu": "N",
      "semesterhaelfte": "0",
      "fakultaet": "efi",
      "semestername": "ss23",
      "turnus": null,
      "name": "Test Termin",
      "dozent": "-",
      "kommentar": null
    }
  ]

  async function testGet() {
    try {
      const res = await axios.get(
        "http://localhost:8080/ss23/rooms/KA.304/appointments",
        {
          withCredentials: true,
          auth: {
            username: "lehnerdi",
            password: "1234",
          },
          crossdomain: true,
        }
      );
      console.log(res);
      setAppt(res.data);
    } catch (error) {
      console.error("Error get data:", error);
    }
  }

  async function testPost() {
    try {
      await axios.post(
        "http://localhost:8080/ss23/rooms/KA.304/appointments?BookAllOrNothing=true", testData,
        {
          withCredentials: true,
          auth: {
            username: "lehnerdi",
            password: "1234",
          },
          crossdomain: true,
        }
      );
    } catch (error) {
      console.error("Error upload data:", error);
    }
  }

  async function testDelete() {
    try {
      await axios.post(
        "http://localhost:8080/ss23/rooms/KA.304/appointments/delete?DeleteOrNothing=true", testData,
        {
          withCredentials: true,
          auth: {
            username: "lehnerdi",
            password: "1234",
          },
          crossdomain: true,
        }
      );
    } catch (error) {
      console.error("Error delte data:", error);
    }
  }


  useEffect(() => {
    testGet();
  }, []);

  const renderAppointments = () => {
    return appt.map((el, idx) => (
      <Typography key={idx}>{el.name}</Typography>
    ));
  };

  const handleClick = () => {
    console.log("delete showed appoiment list")
    setAppt([]);
  }

  const handlePostAppt = () => {
    console.log("book new appoinment through api")
    testPost()
  }

  const handleDeleteAppt = () => {
    console.log("delete appointment through api")
    testDelete();
  }

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        sx={{ margin: "5px" }}
        onClick={testGet}
      >
        Get Appointments in KA.304
      </Button>
      <Button
        color="warning"
        variant="contained"
        sx={{ margin: "5px" }}
        onClick={handleClick}
      >
        Appointments List Löschen
      </Button>
      <Button
        color="success"
        variant="contained"
        sx={{ margin: "5px" }}
        onClick={handlePostAppt}
      >
        Test Termin buchen
      </Button>
      <Button
        color="error"
        variant="contained"
        sx={{ margin: "5px" }}
        onClick={handleDeleteAppt}
      >
        Test Termin löschen
      </Button>
      <Box sx={{ m: 1 }}>
        {appt.length > 0 ? (
          renderAppointments()
        ) : (
          <Typography>Terminliste wird gelöscht</Typography>
        )}
      </Box>
    </div >
  );
}

export default App;
