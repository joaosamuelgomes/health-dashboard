import { useState, useEffect, useMemo } from "react";
import DateSelector from "./components/DateSelector";
import { fetchData } from "./services/apiServices";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import Header from "./pages/Header";
import DataTable from "./components/DataTable";

function App() {

    //estados
    const [dados, setDados] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //variáveis
    const [time_range, setTime_range] = useState("");
    const [age, setAge] = useState("");
    const [cid, setCid] = useState("");
    const [gender, setGender] = useState("");

    ChartJS.register(ArcElement, Tooltip, Legend, Title);

    const handleDateChange = (range) => {
        setTime_range(range);
    };

    //buscando dados da API
    useEffect(() => {
        setIsLoading(true);
        fetchData(time_range, age, cid, gender)
            .then((data) => {
                console.log("Dados retornados:", data.data);
                setDados(data.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [time_range, age, gender, cid]);

    const { maleCount, femaleCount } = useMemo(() => {
        let maleCount = 0;
        let femaleCount = 0;

        if (dados && dados.somaCids) {
            dados.somaCids.forEach((item) => {
                maleCount += item.genderCounts["M"];
                femaleCount += item.genderCounts["F"];
            });
        }

        return { maleCount, femaleCount };
    }, [dados]);

    const data = {
        labels: ["Feminino", "Masculino"],
        datasets: [
            {
                data: [femaleCount, maleCount],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(53, 162, 235, 0.5)",
                ],
                hoverBackgroundColor: [
                    "rgba(255, 99, 132, 0.7)",
                    "rgba(53, 162, 235, 0.7)",
                ],
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
            <div className="p-8 flex justify-between items-start">
                <div className="w-[75%]">
                    <DataTable data={dados.somaCids || []} isLoading={isLoading} />
                </div>

                <div className="w-[436px] flex justify-center p-8 bg-white rounded min-h-[436px]">
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
                        </div>
                    ) : (
                        <Pie options={options} data={data} />
                    )}
                </div>
            </div>

        </>
    );
}

export default App;
