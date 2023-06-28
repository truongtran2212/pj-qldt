import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { faFileSignature } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Dropdown, Modal, Row } from 'antd';
import { DatePicker, Space } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import "./Detail.css"

const headerName = [
    "", "Tiền", "Link File Saoke", "Link File tính tiền", "Comment", "Ngày chuyển tiền", "Thao tác", "Expected Revenue", "Revenue Excluding Tax", "Tax", "Total Revenue"
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

export default function BasicTable() {
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#dbdef6",
            color: "#2b3245",
            fontWeight: 600,
            padding: 10,

            fontSize: 14,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            padding: 10,

        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const items = [
        {
            label: 'Actual',
            key: '1',
        },
        {
            label: 'Forecast',
            key: '2',
        },
    ];

    const handleMenuClick = (e) => {
        console.log('click', e);
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };


    const [isOpenModalExpectedRevenue, setIsOpenModalExpectedRevenue] = React.useState(false);
    const showModal = () => {
        setIsOpenModalExpectedRevenue(true);
    };


    return (
        <>
            <div style={{ height: "100vh", backgroundColor: "rgb(174 187 75 / 10%)", position: "relative", width: "100%" }}>
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "10vh"
                }}>
                    <div style={{ width: "100%", backgroundColor: "#fff" }}>
                        Footer
                    </div>
                </div>
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "green",
                    height: "3vh"
                }}>
                    <div style={{ width: "100%", backgroundColor: "gray" }}>
                        Khoảng cách giữa 2 component
                    </div>
                </div>
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "blue",
                    height: "15vh"
                }}>
                    <div style={{ width: "98%", backgroundColor: "#fff", height: "100%", borderRadius: "10px" }}>
                        <h1 style={{ margin: 0, textAlign: "center" }}>Tên dự án</h1>
                        <Row style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Col span={2}></Col>
                            <Col span={10}>
                                <p>Currentcy: VND</p>
                                <p>Market: Viet Nam</p>
                                <p> Client Code: TruongTX</p>
                            </Col>
                            <Col span={10}>
                                <p>PD service: Ví dụ</p>
                                <p>Bank account: Chưa biết</p>
                                <p>Deal owner: Chưa biết</p>
                            </Col>
                            <Col span={2}></Col>
                        </Row>


                    </div>
                </div>
                <Row style={{ width: "99%" }}>
                    <Col span={8}></Col>
                    <Col span={8} style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "6vh"
                    }}>
                        <Space direction="vertical">
                            <DatePicker style={{ width: 200 }} onChange={onChange} allowClear={false} picker="year" />
                        </Space>
                        <Dropdown menu={menuProps} trigger={['click']}>
                            <Button style={{ marginLeft: "20px", width: 150 }}>
                                <Space>
                                    Deal Stage
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    </Col>
                    <Col span={8} >
                        <Button style={{ float: "right", top: "20%", backgroundColor: "#1677ff", color: "#fff", fontWeight: 500 }} onClick={() => setIsOpenModalExpectedRevenue(true)}>
                            <Space>
                                Doanh thu dự kiến
                            </Space>
                        </Button>
                    </Col>
                </Row>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: "100%" }}>

                    <TableContainer component={Paper} style={{ width: "98%", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.35) 13px 20px 11px -8px " }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <StyledTableRow>
                                    {headerName.map(data => (
                                        <StyledTableCell align="center">{data}</StyledTableCell>
                                    ))}
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {mockData.map((data, index) => (
                                    <StyledTableRow
                                        key={data.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell align='center' style={{
                                            backgroundColor: "#f2f3fb",
                                            color: "#2b3245",
                                            fontWeight: 600,
                                        }}>
                                            Tháng {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{data.tien}</StyledTableCell>
                                        <StyledTableCell align="left"><a href={data.link}>{data.link}</a></StyledTableCell>
                                        <StyledTableCell align="left">{data.comment}</StyledTableCell>
                                        <StyledTableCell align="left">{data.date}</StyledTableCell>
                                        <StyledTableCell align="left">{data.date}</StyledTableCell>
                                        <StyledTableCell align="left">{data.tien}</StyledTableCell>
                                        <StyledTableCell align="left"><a href={data.link}>{data.link}</a></StyledTableCell>
                                        <StyledTableCell align="left">{data.comment}</StyledTableCell>
                                        <StyledTableCell align="left">{data.date}</StyledTableCell>
                                        <StyledTableCell align="center"><FontAwesomeIcon style={{ fontSize: 22, cursor: "pointer" }} icon={faFileSignature} /></StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <ModalExpectedRevenue isOpenModalExpectedRevenue={isOpenModalExpectedRevenue} setIsOpenModalExpectedRevenue={setIsOpenModalExpectedRevenue} />
        </>
    );
}

const ModalExpectedRevenue = ({ isOpenModalExpectedRevenue, setIsOpenModalExpectedRevenue }) => {
    const handleOk = () => {
        setIsOpenModalExpectedRevenue(false);
    };
    const handleCancel = () => {
        setIsOpenModalExpectedRevenue(false);
    };
    return (<>
        <Modal title="Basic Modal" open={isOpenModalExpectedRevenue} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    </>)
}