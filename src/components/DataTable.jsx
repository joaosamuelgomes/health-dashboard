import React from "react";
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
} from "@mui/material";

function DataTable({ data, isLoading }) {
    return (
        <TableContainer component={Paper}>
            {isLoading ? (
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ minHeight: '65vh' }}>
                    <CircularProgress />
                    <Typography variant="h6" mt={2}>Carregando...</Typography>
                </Box>
            ) : (
                <>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                                <TableCell align="left" width="400px">CID</TableCell>
                                <TableCell align="center" width="200px">Feminino</TableCell>
                                <TableCell align="center" width="200px">Masculino</TableCell>
                                <TableCell align="center" width="200px">Total</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                    <TableContainer
                        sx={{
                            maxHeight: '65vh' ,
                            overflowY: 'auto',
                            '&::-webkit-scrollbar': {
                                width: '8px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#888',
                                borderRadius: '4px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                backgroundColor: '#555',
                            },
                        }}
                    >
                        <Table aria-label="simple table">
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{
                                            '&:last-child td, &:last-child th': {
                                                border: 0,
                                            },
                                            '&:hover': {
                                                backgroundColor: '#f5f5f5',
                                            },
                                        }}
                                    >
                                        <TableCell component="th" scope="row" align="left" width="400px">
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
                </>
            )}
        </TableContainer>
    );
}

export default DataTable;
