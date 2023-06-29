// FormOne.js
import React, { useEffect, useState } from "react";
import "./App.css";
import { Box, Button } from "@mui/material";
import { CSVLink } from "react-csv";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';


const Site = () => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const headers = [

        { label: 'Unique Key', key: 'Unique Key' },

        { label: 'PONumber', key: 'PONumber' },

        { label: 'Job Number', key: 'Job Number' },

        { label: 'Site Id', key: 'Site Id' },

        { label: 'Pat Date', key: 'Pat Date' },

        { label: 'Currency', key: 'Currency' },

        { label: 'Vendor', key: 'Vendor' },

        { label: 'Invoice Number', key: 'Invoice Number' },

        { label: 'CULCode', key: 'CULCode' },

        { label: 'CULDescription', key: 'CULDescription' },

        { label: 'Level 2', key: 'Level 2' },

        { label: 'Level 3', key: 'Level 3' },

        { label: 'Level 4', key: 'Level 4' },

        { label: 'As Built Quantity', key: 'As Built Quantity' },

        { label: 'Final_PurchaseCost_PerUnit_Or_Set', key: 'Final_PurchaseCost_PerUnit_Or_Set' },

        { label: 'Tag Number', key: 'Tag Number' },

        { label: 'Serial no', key: 'Serial no' },

        { label: 'Reconciliation', key: 'Reconciliation' },

    ];
    const headers1 = [

        { label: 'Asset Id', key: 'Asset Id' },

        { label: 'Asset Status', key: 'Asset Status' },

        { label: 'Asset Timestamp', key: 'Asset Timestamp' },

        { label: 'Tag Number', key: 'Tag Number' },

        { label: 'Tag Timestamp', key: 'Tag Timestamp' },

        { label: 'Serial Number', key: 'Serial Number' },

        { label: 'Serial TimeStamp', key: 'Serial TimeStamp' },

        { label: 'Asset Category', key: 'Asset Category' },

        { label: 'Asset Category(Other)', key: 'Asset Category(Other)' },

        { label: 'Asset Description', key: 'Asset Description' },

        { label: 'Asset Description (Other)', key: 'Asset Description (Other)' },

        { label: 'Manufacturer Name', key: 'Manufacturer Name' },

        { label: 'Manufacturer Name(Other)', key: 'Manufacturer Name(Other)' },

        { label: 'Latitude', key: 'Latitude' },

        { label: 'Longitude', key: 'Longitude' },

        { label: 'Site Id', key: 'Site Id' },

        { label: 'Remark', key: 'Remark' },

        { label: 'User', key: 'User' },

        { label: 'Reconciliation', key: 'Reconciliation' }

    ];
    useEffect(() => {
        async function fetchData() {
            const fartopv = await axios.get('https://pvback.onrender.com/api/check/fartopv');
            setData(fartopv.data);
            const pvtofar = await axios.get('https://pvback.onrender.com/api/check/pvtofar');
            setData1(pvtofar.data);
            setLoaded(true);
        }

        fetchData();
    }, []);
    const csvReport = {

        data: data,

        headers: headers,

        filename: 'FartoPv.csv'

    };
    const csvReport1 = {

        data: data1,

        headers: headers1,

        filename: 'PvtoFar.csv'

    };
    const handleButtonClick = async () => {
        const zip = new JSZip();
        const folder = zip.folder('images');
        data1.forEach((image) => {
            const imageDataUrl = image["Asset Image"] != null ? image["Asset Image"] : "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";
            const base64Data = imageDataUrl.split(",")[1]; // Extract base64 data from the data URL
            const filename = `${image["Tag Number"]}_AssetImage.png`;
            folder.file(filename, base64Data, { base64: true });
            const imageDataUrl1 = image["Tag Image"] != null ? image["Tag Image"] : "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";
            const base64Data1 = imageDataUrl1.split(",")[1]; // Extract base64 data from the data URL
            const filename1 = `${image["Tag Number"]}_TagImage.png`;
            folder.file(filename1, base64Data1, { base64: true });
            const imageDataUrl2 = image["Serial Number Image"] != null ? image["Serial Number Image"] : "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";
            const base64Data2 = imageDataUrl2.split(",")[1]; // Extract base64 data from the data URL
            const filename2 = `${image["Tag Number"]}_SerialNumberImage.png`;
            folder.file(filename2, base64Data2, { base64: true });
        });
        const zipContent = await zip.generateAsync({ type: 'blob' });
        saveAs(zipContent, 'images.zip');
    }
    return (
        <div className="App">
            <header className="App-header">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h2 style={{ minWidth: 150, marginBottom: "60px", color: 'Black' }}>Export Reports</h2>
                </div>
                {loaded ? (
                    <div>
                        <Box
                            sx={{ minWidth: 220, marginBottom: "20px", marginTop: "-20px" }}
                        >
                            <CSVLink {...csvReport} style={{ textDecoration: 'none' }}>
                                <Button
                                    sx={{ minWidth: 220, marginBottom: "20px" }}
                                    type="submit"
                                    variant="contained"
                                    className="App-link"

                                >
                                    Far To PV
                                </Button>
                            </CSVLink>
                        </Box>
                        <Box
                            sx={{ minWidth: 220, marginBottom: "20px", marginTop: "-20px" }}
                        >
                            <CSVLink {...csvReport1} style={{ textDecoration: 'none' }}>
                                <Button
                                    sx={{ minWidth: 220, marginBottom: "20px" }}
                                    type="submit"
                                    variant="contained"
                                    className="App-link"
                                    onClick={handleButtonClick}
                                >
                                    PV to FAR
                                </Button>
                            </CSVLink>
                        </Box>
                    </div>
                ) : (
                    <div>
                        <Box
                            sx={{ minWidth: 220, marginBottom: "20px", marginTop: "-20px" }}
                        >
                            <CircularProgress />
                        </Box>
                    </div>
                )
                }
            </header>
        </div >
    );
}

export default Site;
