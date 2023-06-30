import { LoadingOutlined, PlusOutlined, VerticalLeftOutlined, VerticalRightOutlined } from '@ant-design/icons';
import { Modal, Row, Upload, Col, Button, Image, Tooltip, Spin, Table, Space, DatePicker, Select } from 'antd';
import { useState } from 'react';
import {
    UploadOutlined,
} from "@ant-design/icons";
import Dragger from 'antd/es/upload/Dragger';
import ReactImageMagnify from 'react-image-magnify';
import pdfjs from "pdfjs-dist";
const { createCanvas } = require('canvas');
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.12.313/build/pdf.worker.js';

const pdfjsLib = window.pdfjsLib;
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
const { Option } = Select;

const TestPDF = () => {
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState("");
    const [images, setImages] = useState([]);
    const [imagesURL, setImagesURL] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [numPagesPDF, setNumPagesPDF] = useState();
    const [loading, setLoading] = useState(false);
    const handleChangeUpload = (e) => {
        console.log(e)
        const fileList = e.fileList;
        setFileList(fileList);
        setPreviewImage(URL.createObjectURL(fileList[0].originFileObj));
        if (fileList[0].type === "application/pdf") {
            console.log("Vào đây")
            convertPDFToImages(
                URL.createObjectURL(fileList[0].originFileObj),
                fileList
            );
        } else {
            var lsImageUpload = fileList.map((item) => item.originFileObj);
            setImages(lsImageUpload);
            setImagesURL([URL.createObjectURL(fileList[0].originFileObj)]);
            setNumPagesPDF(lsImageUpload.length);
        }
        // setDataBill();
        setFileList([]);
        setCurrentPage(1);
    };

    function dataURLtoFile(dataURL, fileName) {
        var arr = dataURL.split(",");
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, { type: mime });
    }

    //Trường hợp 1: Đây mới là đang làm trường hợp mỗi file PDF chỉ có 1 ảnh ("Đã xử lý")
    //Trường hợp 2: 1 File PDF có nhiều ảnh ở trong
    // Từng ảnh sẽ có nhiều URL
    //     + Bây giờ phải map() URL của ảnh ra để hiển thị từng ảnh
    // 
    // Việc ràng buộc người dùng chỉ nên Up 1 File duy nhất HAY sẽ Up được nhiều File
    //      + Nếu Up nhiều File thì phải xử lý số lượng Page của từng File

    const convertPDFToImages = async (pdfUrl, fileList) => {
        try {
            // Tạo đối tượng PDF từ dữ liệu PDF
            setLoading(true)
            const pdf = await pdfjsLib.getDocument(pdfUrl).promise;

            // Lấy số trang của PDF
            const numPages = pdf.numPages;

            // Mảng chứa hình ảnh
            const images = [];
            const pageImagesURL = [];
            // Duyệt qua từng trang PDF
            for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
                // Lấy trang PDF
                const page = await pdf.getPage(pageNumber);

                // Lấy kích thước của trang
                const viewport = page.getViewport({ scale: 1 });

                // Tạo canvas để vẽ trang PDF
                const canvas = createCanvas(viewport.width, viewport.height);
                const context = canvas.getContext('2d');

                // Render trang PDF lên canvas
                await page.render({
                    canvasContext: context,
                    viewport: viewport,
                }).promise;

                // Convert canvas thành hình ảnh dưới dạng URL
                const imageDataURL = canvas.toDataURL('image/png');
                const convert_base64tofileimg = dataURLtoFile(
                    imageDataURL,
                    `page_${pageNumber}__.png`
                );
                // Thêm hình ảnh vào mảng
                images.push(convert_base64tofileimg);
                pageImagesURL.push(URL.createObjectURL(convert_base64tofileimg));
            }
            setImages(images);
            setImagesURL(pageImagesURL);
            setLoading(false);
            // Trả về mảng hình ảnh
            console.log(numPages)
            setNumPagesPDF(numPages)
            return images;
        } catch (error) {
            console.error('Lỗi chuyển đổi PDF thành hình ảnh:', error);
            return [];
        }

    };

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const handleMouseMove = (event) => {
        setPosition({ x: event.pageX, y: event.pageY });
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < numPagesPDF) {
            setCurrentPage(currentPage + 1);
        }
    };
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 60,
            }}
            spin
        />
    );
    const columns = [
        {
            title: 'Khách hàng',
            dataIndex: 'name',
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe',
                },
                {
                    text: 'Jim',
                    value: 'Jim',
                },
                {
                    text: 'Category 2',
                    value: 'Category 2',
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.name.startsWith(value),
            width: '20%',
        },
        {
            title: 'Dự án',
            dataIndex: 'project',
            // sorter: (a, b) => a.age - b.age,
            width: '20%',
        },
        {
            title: 'Tiền dự án',
            dataIndex: 'address',
            width: '10%',
        },
        {
            title: 'Tiền trả',
            dataIndex: 'address',
            width: '10%',
        },
        {
            title: 'Ngày chuyển',
            dataIndex: 'date',
            width: '20%',
        },
        {
            title: 'Diễn giải',
            dataIndex: 'description',
            width: '40%',
        },
    ];
    const data = [
        {
            key: '1',
            name: 'TruongTX',
            project: 32,
            address: 100000,
            date: "23/12/2023 14:00:00",
            description: "Khách đã trả đủ tiền"
        },
        {
            key: '2',
            name: 'LongLH',
            project: 42,
            address: 200000,
            date: "23/12/2023 14:00:00",
            description: "Khách đã trả đủ tiền"
        },
        {
            key: '3',
            name: 'VietHN',
            project: 32,
            address: 300000,
            date: "23/12/2023 14:00:00",
            description: "Khách đã trả đủ tiền"
        },
        {
            key: '4',
            name: 'KienDT',
            project: 32,
            address: 400000,
            date: "23/12/2023 14:00:00",
            description: "Đã thanh toán"
        },
        {
            key: '1',
            name: 'TruongTX',
            project: 32,
            address: 100000,
            date: "23/12/2023 14:00:00",
            description: "Khách đã trả đủ tiền"
        },
        {
            key: '2',
            name: 'LongLH',
            project: 42,
            address: 200000,
            date: "23/12/2023 14:00:00",
            description: "Khách đã trả đủ tiền"
        },
        {
            key: '3',
            name: 'VietHN',
            project: 32,
            address: 300000,
            date: "23/12/2023 14:00:00",
            description: "Khách đã trả đủ tiền"
        },
        {
            key: '4',
            name: 'KienDT',
            project: 32,
            address: 400000,
            date: "23/12/2023 14:00:00",
            description: "Đã thanh toán"
        },
        {
            key: '1',
            name: 'TruongTX',
            project: 32,
            address: 100000,
            date: "23/12/2023 14:00:00",
            description: "Khách đã trả đủ tiền"
        },
        {
            key: '2',
            name: 'LongLH',
            project: 42,
            address: 200000,
            date: "23/12/2023 14:00:00",
            description: "Khách đã trả đủ tiền"
        },
        {
            key: '3',
            name: 'VietHN',
            project: 32,
            address: 300000,
            date: "23/12/2023 14:00:00",
            description: "Khách đã trả đủ tiền"
        },
        {
            key: '4',
            name: 'KienDT',
            project: 32,
            address: 400000,
            date: "23/12/2023 14:00:00",
            description: "Đã thanh toán"
        },
        {
            key: '1',
            name: 'TruongTX',
            project: 32,
            address: 100000,
            date: "23/12/2023 14:00:00",
            description: "Khách đã trả đủ tiền"
        },
        {
            key: '2',
            name: 'LongLH',
            project: 42,
            address: 200000,
            date: "23/12/2023 14:00:00",
            description: "Khách đã trả đủ tiền"
        },
        {
            key: '3',
            name: 'VietHN',
            project: 32,
            address: 300000,
            date: "23/12/2023 14:00:00",
            description: "Khách đã trả đủ tiền"
        },
        {
            key: '4',
            name: 'KienDT',
            project: 32,
            address: 400000,
            date: "23/12/2023 14:00:00",
            description: "Đã thanh toán"
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const onChangeMonth = (date, dateString) => {
        console.log(date, dateString);
    };

    const items = [
        "VBPO Việt Nam", "VBPO Nhật Bản"
    ];

    return (
        <>
            <div style={{ height: "100vh" }}>
                <div style={{ height: "10vh", backgroundColor: "aqua" }}>
                    Header
                </div>
                <div style={{ height: "10vh", backgroundColor: "pink", marginTop: "10px" }}>
                    <Row style={{ width: "99%" }}>
                        <Col span={8}></Col>
                        <Col span={8} style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "6vh"
                        }}>
                            <Space direction="vertical">
                                <DatePicker style={{ width: 200 }} onChange={onChangeMonth} allowClear={false} picker="year" />
                            </Space>
                            <Select
                                placeholder="Chọn Deal Stage"
                                style={{
                                    width: 150,
                                    marginLeft: 20,
                                }}
                                key="type_document1"
                                allowClear
                                maxTagCount="responsive"
                                optionFilterProp="children"
                                defaultValue={"VBPO Việt Nam"}
                            // optionLabelProp="data-label"
                            // getPopupContainer={getPopupContainer}
                            >
                                {items.map((item, index) => (
                                    <Option key={index} value={item}>
                                        {item}
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                </div>
                <div style={{ textAlign: "center", height: "75vh", display: "flex", backgroundColor: "red", marginTop: "10px" }}>
                    <Row style={{ width: "100%" }}>
                        <Col span={9} style={{ height: "660px" }}>
                            <Spin spinning={loading} indicator={antIcon} size="large" style={{ height: 660 }}>
                                <Dragger
                                    className="uploadFileSK"
                                    fileList={fileList}
                                    multiple={false}
                                    onChange={(e) => handleChangeUpload(e)}
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    accept=""
                                    style={{ width: 650, height: 650, background: "none", border: "unset" }}

                                >
                                    {images.length === 0 ? (
                                        <Image
                                            // onClick={
                                            //     userName !== "" && passWord !== ""
                                            //         ? setError(false)
                                            //         : checkUser
                                            // }
                                            preview={false}

                                            src="https://media.istockphoto.com/id/1392182937/fr/vectoriel/aucune-image-disponible-photo-%C3%A0-venir.jpg?s=612x612&w=0&k=20&c=iJ7Bhi7QRKOmrAFq36r7WOz8B-a5BIj_Fn2iFEgGB8M="
                                        ></Image>
                                    ) :
                                        <>
                                            <div style={{ height: 500, width: 600 }}>
                                                {imagesURL.length > 0 && (
                                                    <Image
                                                        // onClick={
                                                        //     userName !== "" && passWord !== ""
                                                        //         ? setError(false)
                                                        //         : checkUser
                                                        // }
                                                        preview={false}
                                                        height={650}
                                                        width={600}
                                                        style={{ marginLeft: "30px" }}
                                                        src={imagesURL[currentPage - 1]}
                                                    ></Image>
                                                )}
                                            </div>
                                        </>
                                    }
                                </Dragger>
                            </Spin>
                            <Row style={{
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center",
                            }}>
                                {numPagesPDF && (
                                    <p

                                    >
                                        {imagesURL.length > 0 ? (
                                            <>
                                                <Tooltip placement="topLeft" title="Previous">
                                                    <Button
                                                        type="primary"
                                                        shape="round"
                                                        icon={<VerticalRightOutlined />}
                                                        size="small"
                                                        onClick={handlePreviousPage}
                                                        disabled={currentPage === 1}
                                                    />
                                                </Tooltip>
                                                &nbsp;&nbsp; {currentPage}/{numPagesPDF} &nbsp;&nbsp;
                                                <Tooltip placement="topLeft" title="Next">
                                                    <Button
                                                        type="primary"
                                                        shape="round"
                                                        icon={<VerticalLeftOutlined />}
                                                        size="small"
                                                        onClick={handleNextPage}
                                                        disabled={currentPage === numPagesPDF}
                                                    />
                                                </Tooltip>
                                            </>
                                        ) : null}
                                    </p>
                                )}
                            </Row>
                        </Col>
                        <Col span={15}>
                            <Table className='table-in-input' columns={columns} dataSource={data} style={{ marginRight: "3%", height: "500px" }} pagination={false} />
                        </Col>
                    </Row>
                </div>
            </div>


        </>
    );
};
export default TestPDF;