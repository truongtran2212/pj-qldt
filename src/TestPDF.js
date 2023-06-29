import { PlusOutlined, VerticalLeftOutlined, VerticalRightOutlined } from '@ant-design/icons';
import { Modal, Row, Upload, Col, Button, Image, Tooltip } from 'antd';
import { useState } from 'react';
import {
    UploadOutlined,
} from "@ant-design/icons";
import Dragger from 'antd/es/upload/Dragger';
import ReactImageMagnify from 'react-image-magnify';
import { pdfjs } from 'react-pdf';
const TestPDF = () => {
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState("");
    const [images, setImages] = useState([]);
    const [imagesURL, setImagesURL] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [numPages, setNumPages] = useState();
    const [loading, setLoading] = useState(false);
    const handleChangeUpload = (e) => {
        console.log(e)
        const fileList = e.fileList;
        setFileList(fileList);
        setPreviewImage(URL.createObjectURL(fileList[0].originFileObj));
        if (fileList[0].type === "application/pdf") {
            convertPDFToImages(
                URL.createObjectURL(fileList[0].originFileObj),
                fileList
            );
        } else {
            var lsImageUpload = fileList.map((item) => item.originFileObj);
            setImages(lsImageUpload);
            setImagesURL([URL.createObjectURL(fileList[0].originFileObj)]);
            setNumPages(lsImageUpload.length);
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

    const convertPDFToImages = async (pdfUrl, fileList) => {
        console.log("Vào đây mới lỗi")
        
        setLoading(true);
        const pdf = await pdfjs.getDocument(pdfUrl).promise;
        console.log(pdf)
        const totalNumPages = pdf.numPages;
        setNumPages(totalNumPages);
        const pageImages = [];
        const pageImagesURL = [];
        console.log("Vào đây mới lỗi 123")
        for (let i = 1; i <= totalNumPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 1.0 });
            const canvas = document.createElement("canvas");
            const canvasContext = canvas.getContext("2d");
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const renderContext = {
                canvasContext,
                viewport,
            };
            await page.render(renderContext).promise;
            const imageData = canvas.toDataURL("image/png");
            const convert_base64tofileimg = dataURLtoFile(
                imageData,
                `page_${i}__.png`
            );
            // const convert_base64tofileimg = dataURLtoFile(
            //   imageData,
            //   `page_${i}__` +
            //     images[0].name.replace(images[0].name.match(/\.([^.]+)$/)[1], "png")
            // );
            pageImages.push(convert_base64tofileimg);
            pageImagesURL.push(URL.createObjectURL(convert_base64tofileimg));
        }
        setImages(pageImages);
        setImagesURL(pageImagesURL);
        setLoading(false);
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
        if (currentPage < numPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    return (
        <>
            <div style={{ textAlign: "center", height: "100%" }}>
                <Row style={{ height: "100%" }}>
                    <Col
                        span={9}
                        className={"colImageCMND content-middle"}
                        // style={{ marginRight: "1%" }}
                        style={{ zIndex: 1 }}
                    // }}
                    // style={(rotateCMND % 180) === 90 ? { height: 670 } : null}
                    >
                        <Dragger
                            fileList={fileList}
                            multiple={true}
                            onChange={(e) => handleChangeUpload(e)}
                            showUploadList={false}
                            beforeUpload={() => false}
                            accept=""
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
                            ) : images[0].type === "application/pdf" ? (
                                <>
                                    <div style={{ height: 700 }}>
                                        {imagesURL.length > 0 && (
                                            <ReactImageMagnify
                                                {...{
                                                    smallImage: {
                                                        isFluidWidth: false,
                                                        src: imagesURL[currentPage - 1],
                                                        width: 400,
                                                        height: 500,
                                                    },
                                                    largeImage: {
                                                        src: imagesURL[currentPage - 1],
                                                        width: 1200,
                                                        height: 1800,
                                                    },
                                                }}
                                            />
                                        )}
                                    </div>
                                </>
                            ) : null}
                        </Dragger>
                    </Col>
                    <Col span={2}>
                        {numPages && (
                            <p
                                style={{
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
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
                                        &nbsp;&nbsp; {currentPage}/{numPages} &nbsp;&nbsp;
                                        <Tooltip placement="topLeft" title="Next">
                                            <Button
                                                type="primary"
                                                shape="round"
                                                icon={<VerticalLeftOutlined />}
                                                size="small"
                                                onClick={handleNextPage}
                                                disabled={currentPage === numPages}
                                            />
                                        </Tooltip>
                                    </>
                                ) : null}
                            </p>
                        )}
                    </Col>
                </Row>
            </div>
        </>
    );
};
export default TestPDF;