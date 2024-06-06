import React, { useState, useEffect } from "react";

const DateSelector = ({ onChange }) => {
    const [startMonth, setStartMonth] = useState("01");
    const [startYear, setStartYear] = useState("2014");
    const [endMonth, setEndMonth] = useState("12");
    const [endYear, setEndYear] = useState("2023");

    const months = [
        { value: "01", label: "Janeiro" },
        { value: "02", label: "Fevereiro" },
        { value: "03", label: "Março" },
        { value: "04", label: "Abril" },
        { value: "05", label: "Maio" },
        { value: "06", label: "Junho" },
        { value: "07", label: "Julho" },
        { value: "08", label: "Agosto" },
        { value: "09", label: "Setembro" },
        { value: "10", label: "Outubro" },
        { value: "11", label: "Novembro" },
        { value: "12", label: "Dezembro" },
    ];

    const years = [];
    for (let year = 2014; year <= 2023; year++) {
        years.push(year.toString());
    }

    // Atualizar o time_range sempre que os selects forem alterados
    useEffect(() => {
        const startDate = `${startYear}${startMonth}`;
        const endDate = `${endYear}${endMonth}`;
        onChange(`${startDate}-${endDate}`);
    }, [startMonth, startYear, endMonth, endYear, onChange]);

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap space-x-4">
                <div className="flex-1">
                    <label
                        htmlFor="startMonth"
                        className="block text-sm font-medium text-white"
                    >
                        Mês inicial
                    </label>
                    <select
                        id="startMonth"
                        value={startMonth}
                        onChange={(e) => setStartMonth(e.target.value)}
                        className="mt-1 block w-full min-w-[140px] py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm 
                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        {months.map((month) => (
                            <option key={month.value} value={month.value}>
                                {month.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex-1">
                    <label
                        htmlFor="startYear"
                        className="block text-sm font-medium text-white"
                    >
                        Ano inicial
                    </label>
                    <select
                        id="startYear"
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 text-black bg-white rounded-md shadow-sm 
                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex-1">
                    <label
                        htmlFor="endMonth"
                        className="block text-sm font-medium text-white"
                    >
                        Mês final
                    </label>
                    <select
                        id="endMonth"
                        value={endMonth}
                        onChange={(e) => setEndMonth(e.target.value)}
                        className="mt-1 block w-full min-w-[140px] py-2 px-3 border border-gray-300 text-black bg-white rounded-md shadow-sm 
                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        {months.map((month) => (
                            <option key={month.value} value={month.value}>
                                {month.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex-1">
                    <label
                        htmlFor="endYear"
                        className="block text-sm font-medium text-white"
                    >
                        Ano final
                    </label>
                    <select
                        id="endYear"
                        value={endYear}
                        onChange={(e) => setEndYear(e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 text-black bg-white rounded-md shadow-sm 
                        focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default DateSelector;
