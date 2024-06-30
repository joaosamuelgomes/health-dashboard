import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Box,
    Typography,
    TableSortLabel,
} from "@mui/material";

function DataTable({ data, isLoading, onCidUpdate }) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [selectedCID, setSelectedCID] = useState('');

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

        // const handleDoubleClick = (cid) => {
        //     const shortCID = cid.split(' ')[0];
        //     setSelectedCID(shortCID);
        // };

    useEffect(() => {
        if (selectedCID) {
            onCidUpdate(selectedCID);
        }
    }, [selectedCID, onCidUpdate]);

    const sortedData = data.slice().sort((a, b) => {
        if (orderBy === 'total') {
            const totalA = a.genderCounts.F + a.genderCounts.M;
            const totalB = b.genderCounts.F + b.genderCounts.M;
            return order === 'asc' ? totalA - totalB : totalB - totalA;
        }
        
        if (orderBy.startsWith('genderCounts.')) {
            const key = orderBy.split('.')[1];
            return order === 'asc' ? a.genderCounts[key] - b.genderCounts[key] : b.genderCounts[key] - a.genderCounts[key];
        }

        if (orderBy) {
            return order === 'asc' ? a[orderBy].localeCompare(b[orderBy]) : b[orderBy].localeCompare(a[orderBy]);
        }

        return 0;
    });

    return (
        <TableContainer component={Paper}>
            {isLoading ? (
                <Box className="flex flex-col items-center justify-center min-h-[71.5vh]">
                    <CircularProgress />
                    <Typography variant="h6" mt={2}>Carregando...</Typography>
                </Box>
            ) : (
                <>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow className="bg-gray-100">
                                <TableCell align="left" width="400px" className="font-bold">
                                    <TableSortLabel
                                        active={orderBy === 'name'}
                                        direction={orderBy === 'name' ? order : 'asc'}
                                        onClick={() => handleRequestSort('name')}
                                    >
                                        CID
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center" width="200px" className="font-bold">
                                    <TableSortLabel
                                        active={orderBy === 'genderCounts.F'}
                                        direction={orderBy === 'genderCounts.F' ? order : 'asc'}
                                        onClick={() => handleRequestSort('genderCounts.F')}
                                    >
                                        Feminino
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center" width="200px" className="font-bold">
                                    <TableSortLabel
                                        active={orderBy === 'genderCounts.M'}
                                        direction={orderBy === 'genderCounts.M' ? order : 'asc'}
                                        onClick={() => handleRequestSort('genderCounts.M')}
                                    >
                                        Masculino
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center" width="200px" className="font-bold">
                                    <TableSortLabel
                                        active={orderBy === 'total'}
                                        direction={orderBy === 'total' ? order : 'asc'}
                                        onClick={() => handleRequestSort('total')}
                                    >
                                        Total
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                    <TableContainer className="max-h-[65vh] overflow-y-auto custom-scrollbar">
                        <Table aria-label="simple table">
                            <TableBody>
                                {sortedData.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        className="hover:bg-gray-100"
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            align="left"
                                            width="400px"
                                            onDoubleClick={() => handleDoubleClick(row.name)}
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center" width="200px">
                                            {row.genderCounts.F}
                                        </TableCell>
                                        <TableCell align="center" width="200px">
                                            {row.genderCounts.M}
                                        </TableCell>
                                        <TableCell align="center" width="192px">
                                            {row.genderCounts.F + row.genderCounts.M}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {sortedData.length === 0 && (
                        <Box className="flex flex-col items-center justify-center min-h-[65vh]">
                            <Typography variant="h6" mt={2}>Nenhum dado encontrado</Typography>
                        </Box>
                    )}
                </>
            )}
        </TableContainer>
    );
}

export default DataTable;
