import { useState, useEffect } from "react";
import DateSelector from "./components/DateSelector";
import { fetchData } from "./services/apiServices";
import { Pie } from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
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

    ChartJS.register(ArcElement, Tooltip, Legend, Title);

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

    const handleDateChange = (range) => {
        setTime_range(range);
    };

    const data = {
        labels: ["Feminino", "Masculino"],
        datasets: [
            {
                data: [femaleCount, maleCount],
                backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(53, 162, 235, 0.5)"],
                hoverBackgroundColor: ["rgba(255, 99, 132, 0.7)", "rgba(53, 162, 235, 0.7)"],
            },
        ],
    };

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

    return (
        <>
            <Header />
            <div className="p-8 mx-auto flex justify-end mt-12">
                <DateSelector onChange={handleDateChange} />
            </div>
            <div className="p-8 flex justify-end items-center">
                <div className="w-[436px] flex justify-center p-8 bg-white rounded">
                    <Pie options={options} data={data} />
                </div>
            </div>
        </>
    );
}

export default App;
