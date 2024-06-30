import React, { useState, useEffect, useMemo } from "react";
import DateSelector from "./components/DateSelector";
import { fetchData } from "./services/apiServices";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import Header from "./pages/Header";
import DataTable from "./components/DataTable";

function App() {
    // Estados
    const [dados, setDados] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Variáveis de filtro
    const [time_range, setTime_range] = useState("");
    const [age, setAge] = useState("");
    const [cid, setCid] = useState("");
    const [sex, setSex] = useState("");

    // Registro de elementos do gráfico
    ChartJS.register(ArcElement, Tooltip, Legend, Title);

    // Função para atualizar range de tempo
    const handleDateChange = (range) => {
        setTime_range(range);
    };

    // Função para atualizar CID
    const handleCidUpdate = (newCid) => {
        setCid(newCid);
    };

    // Efeito para buscar dados da API
    useEffect(() => {
        setIsLoading(true);
        fetchData(time_range, age, cid, sex)
            .then((data) => {
                console.log("Dados retornados:", data.data);
                setDados(data.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar dados:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [time_range, age, cid, sex]); // Dependências combinadas

    // Cálculo dos contadores de gênero para o gráfico
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

    // Configuração dos dados do gráfico
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

    // Opções do gráfico
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
                    <DataTable data={dados.somaCids || []} isLoading={isLoading} onCidUpdate={handleCidUpdate} />
                </div>

                <div className="flex flex-col justify-between gap-6 min-h-[65vh]">
                    <div className="w-[436px] flex justify-center p-8 bg-white rounded min-h-[436px]">
                        {isLoading ? (
                            <div className="flex justify-center items-center">
                                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
                            </div>
                        ) : (
                            <>
                                <Pie options={options} data={data} />
                            </>
                        )}
                    </div>
                    <div className="w-[436px] flex p-8 bg-white rounded justify-center min-h-[196px]">
                        <p className="text-black font-bold text-xl">Em breve...</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
