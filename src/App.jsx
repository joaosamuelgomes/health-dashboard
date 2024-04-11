import "./App.css";
import { useState, useEffect } from "react";
import { fetchData } from "./services/apiServices";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import React from "react";

function App() {
  const [dados, setDados] = useState([]);
  //const [filteredData, setFilteredData] = useState([]);
  //const [filterSex, setFilterSex] = useState("");
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  useEffect(() => {
    // Fetch data
    const time_range = ``;
    const age = ``;
    const cid = ``;
    const sex = ``;
    fetchData(time_range, age, cid, sex).then((data) => {
      //console.log(data);
      setDados(data.data);
    });
  }, []);

  // useEffect(() => {
  //   if (filterSex === "") {
  //     setFilteredData(dados);
  //   } else {
  //     const filtered = dados.filter(
  //       (item) => item && item.sexopac === filterSex
  //     );
  //     setFilteredData(filtered);
  //   }
  // }, [filterSex, dados]);

  useEffect(() => {
    // Calcular a quantidade de dados para cada sexo
    const maleData = dados.filter((item) => item && item.sexopac === "M");
    const femaleData = dados.filter((item) => item && item.sexopac === "F");
    setMaleCount(maleData.length);
    setFemaleCount(femaleData.length);
  }, [dados]);

  const labels = ["Sexo"];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Atendimentos psicológicos totais",
      },
    },
  };

  const datasets = [
    {
      label: "Feminino",
      data: [femaleCount],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Masculino",
      data: [maleCount],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ];

  const data = {
    labels,
    datasets,
  };

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
}

export default App;
