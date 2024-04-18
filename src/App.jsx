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
    const [time_range, setTime_range] = useState("");
    const [age, setAge] = useState("");
    const [cid, setCid] = useState("");
    const [gender, setGender] = useState("");

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    useEffect(() => {
        fetchData(time_range, age, cid, gender).then((data) => {
            console.log("Dados retornados:", data.data);
            setDados(data.data);
        });
    }, [time_range, age, gender, cid]);

    useEffect(() => {
        if (dados && dados.somaCids) {
            let maleCount = 0;
            let femaleCount = 0;

            // calcular a quantidade de generos
            dados.somaCids.forEach((item) => {
                maleCount += item.genderCounts["M"];
                femaleCount += item.genderCounts["F"];
            });

            setMaleCount(maleCount);
            setFemaleCount(femaleCount);
        }
    }, [dados]);

    const labels = ["Genero"];

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
