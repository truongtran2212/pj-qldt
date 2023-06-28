import { TableCell, styled, tableCellClasses, TableRow, Container, Typography, TableContainer, Paper, Table, TableHead, TableBody, Box } from '@mui/material';
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
const headerName = [
    "", "Tiền", "Link File", "Comment", "Ngày chuyển tiền"
]

const mockData = [
    {
        tien: "1,000,000",
        comment: "Giao dịch thành công",
        date: "01/01/2023 19:12:20",
        link: "qlct.sdsd.sd"
    },
    {
        tien: "2,000,000",
        comment: "Giao dịch thành công",
        date: "01/01/2023 19:12:20",
        link: "qlct.sdsd.sd"
    },
    {
        tien: "3,000,000",
        comment: "Giao dịch thành công",
        date: "01/01/2023 19:12:20",
        link: "qlct.sdsd.sd"
    },
    {
        tien: "4,000,000",
        comment: "Giao dịch thành công",
        date: "01/01/2023 19:12:20",
        link: "qlct.sdsd.sd"
    },
    {
        tien: "5,000,000",
        comment: "Giao dịch thành công",
        date: "01/01/2023 19:12:20",
        link: "qlct.sdsd.sd"
    },
    {
        tien: "6,000,000",
        comment: "Giao dịch thành công",
        date: "01/01/2023 19:12:20",
        link: "qlct.sdsd.sd"
    },
    {
        tien: "7,000,000",
        comment: "Giao dịch thành công",
        date: "01/01/2023 19:12:20",
        link: "qlct.sdsd.sd"
    },
    {
        tien: "8,000,000",
        comment: "Giao dịch thành công",
        date: "01/01/2023 19:12:20",
        link: "qlct.sdsd.sd"
    },
    {
        tien: "9,000,000",
        comment: "Giao dịch thành công",
        date: "01/01/2023 19:12:20",
        link: "qlct.sdsd.sd"
    },
    {
        tien: "10,000,000",
        comment: "Giao dịch thành công",
        date: "01/01/2023 19:12:20",
        link: "qlct.sdsd.sd"
    },
    {
        tien: "11,000,000",
        comment: "Giao dịch thành công",
        date: "01/01/2023 19:12:20",
        link: "qlct.sdsd.sd"
    },
    {
        tien: "12,000,000",
        comment: "Giao dịch thành công",
        date: "01/01/2023 19:12:20",
        link: "qlct.sdsd.sd"
    },
]

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: 240,
        borderRadius: "10px"
    },
    drawerContent: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
    },
    table: {
        minWidth: 650,
        "& .MuiTableCell-root": {
            borderBottom: "1px solid #D1CFD7",
        },
    },
}));

function Detail() {
    const classes = useStyles();
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#e5e5f3",
            color: "#2D3459",
            padding: 8,
            fontSize: 14,
            fontStyle: "normal",
            fontWeight: 600,
            textAlign: "center",
            // border: "1px solid #D1CFD7",
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 12,
            padding: 9,
            textOverflow: "ellipsis",
            textAlign: "center",
            width: 700,
            textTransform: "none",
            // border: "1px solid #D1CFD7",
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        "&:last-child td, &:last-child th": {
            minWidth: 150,
            textTransform: "none",
        },
    }));

    return (
        <>
            <div style={{backgroundColor: "#555a64"}}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2%" }}>
                    <Box style={{ width: "90%" }}>
                        <Container
                            disableGutters
                            maxWidth="false"
                            component="main"
                            className="ContainerHome"
                            style={{ borderRadius: "20px" }}
                        >
                            {/* <TableContainer
                            component={Paper}
                            sx={{ maxHeight: "100vh", boxShadow: "none" }}
                            className="tableContainerImport"
                        > */}
                            <Table
                                sx={{ minWidth: 700 }}

                                stickyHeader
                                aria-label="sticky table"
                                size="small"
                                className={classes.table}

                                style={{ width: "100%", border: "hidden" }}
                            >
                                <TableHead>
                                    <StyledTableRow>
                                        {headerName.map((column, index) => (
                                            <StyledTableCell
                                                style={{ fontSize: 14 }}
                                                key={index}
                                            >
                                                {column}
                                            </StyledTableCell>
                                        ))}
                                    </StyledTableRow>
                                </TableHead>

                                <TableBody>
                                    {mockData.map((data, index) => (
                                        <TableRow>
                                            <StyledTableCell style={{ backgroundColor: "#e5e5f3" }}>
                                                <p>
                                                    Tháng {index + 1}
                                                </p>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <p>
                                                    {data.tien}
                                                </p>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <parseInt>
                                                    {data.date}
                                                </parseInt>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <p>
                                                    {data.comment}
                                                </p>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <a href={data.link}>
                                                    {data.link}
                                                </a>
                                            </StyledTableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {/* </TableContainer> */}
                        </Container>
                    </Box>
                </div>
            </div>
        </>

    )
}

export default Detail