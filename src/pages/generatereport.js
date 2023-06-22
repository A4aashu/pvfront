// FormOne.js
import React, { useEffect, useState } from "react";
import "./App.css";
import { Box, Button } from "@mui/material";
import { CSVLink } from "react-csv";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';


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
