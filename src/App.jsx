import { useState, useEffect } from "react";
import { fetchData } from "./services/apiServices";
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import Header from "./pages/Header";

function App() {
    const [dados, setDados] = useState([]);
    const [maleCount, setMaleCount] = useState(0);
    const [femaleCount, setFemaleCount] = useState(0);

    // -- query params -- //
    const [time_range, setTime_range] = useState("202311-202402");
    const [age, setAge] = useState("");
    const [cid, setCid] = useState("");
    const [sex, setSex] = useState("");

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    useEffect(() => {
        fetchData(time_range, age, cid, sex).then((data) => {
            console.log("Dados retornados:", data.data);
            setDados(Array.isArray(data.data.data) ? data.data.data : []);
        });
    }, [time_range, age, sex, cid]);

    useEffect(() => {
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
        <>
            <Header />
            <div className="flex w-[400px]">
                <Bar options={options} data={data} />
            </div>
        </>
    );
}

export default App;
