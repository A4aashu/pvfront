import React, { Component, useState } from 'react';
import Quagga from 'quagga';
import { Box, InputLabel, FormControl, Button, Paper } from "@mui/material";
import axios from 'axios';
import { InputAdornment, OutlinedInput } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';


class Scanner extends Component {
    componentDidMount() {
        Quagga.init(
            {
                inputStream: {
                    type: 'LiveStream',
                    constraints: {
                        width: 360,
                        height: 430,
                        facingMode: 'environment',
                    },
                    //   area: { // defines rectangle of the detection/localization area
                    //     top: "10%",    // top offset
                    //     right: "10%",  // right offset
                    //     left: "10%",   // left offset
                    //     bottom: "10%"  // bottom offset
                    //   },
                },
                locator: {
                    halfSample: true,
                    patchSize: "large", // x-small, small, medium, large, x-large
                    debug: {
                        showCanvas: true,
                        showPatches: false,
                        showFoundPatches: false,
                        showSkeleton: false,
                        showLabels: false,
                        showPatchLabels: false,
                        showRemainingPatchLabels: false,
                        boxFromPatches: {
                            showTransformed: true,
                            showTransformedBox: true,
                            showBB: true
                        }
                    }
                },
                numOfWorkers: 4,
                decoder: {
                    readers: ['code_128_reader'],
                    debug: {
                        drawBoundingBox: true,
                        showFrequency: true,
                        drawScanline: true,
                        showPattern: true
                    },
                },
                locate: true,
            },
            function (err) {
                if (err) {
                    return console.log(err)
                }
                Quagga.start()
            },
        )
        Quagga.onDetected(this._onDetected)
    }

    componentWillUnmount() {
        Quagga.offDetected(this._onDetected)
    }

    _onDetected = result => {
        this.props.onDetected(result)
        Quagga.stop()
    }

    render() {
        return <div id="interactive" className="viewport" />
    }
}
function Scan() {
    const [scantagv, setscantagv] = useState(false);
    const [scanserialv, setscanserialv] = useState(false);
    const [tag, settag] = useState("")
    const [serial, setserial] = useState("")
    const [response, setResponse] = useState("")
    const [open, setOpen] = React.useState(false);
    const params = new URLSearchParams(window.location.search);
    const site = params.get("site");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        window.location.href = `/information?site=${site}&tag=${tag}&serial=${serial}&response=${response}`
    };
    const onDetected = result => {
        settag(result.codeResult.code);
        Quagga.stop();
    };
    const onDetected1 = result => {
        setserial(result.codeResult.code);
        Quagga.stop();
    };

    const scantag = () => {
        setscantagv(true);
        setscanserialv(false);
    }
    const scanserial = () => {
        setscantagv(false);
        setscanserialv(true);
    }
    const handleSubmitPage2 = async (event) => {
        event.preventDefault();
        try {
            const enteredTagNumber = tag.trim();
            const enteredSerialNumber = serial.trim();
            const formData = new FormData();
            formData.append('tag', enteredTagNumber);
            formData.append('serial', enteredSerialNumber);
            const url = `https://pvback.onrender.com/api/check/far`;
            const farResponse = await axios.get(url, {
                params: {
                    tag: enteredTagNumber,
                    serial: enteredSerialNumber,
                }
            });
            setResponse(farResponse.data);
            handleClickOpen();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {response}
                </DialogTitle>
            </Dialog>
            <header style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: -190
            }}>
                <Paper variant="outlined" style={{ width: 360, height: 430 }}>
                    {(scantagv && <Scanner onDetected={onDetected} />)}
                    {(scanserialv && <Scanner onDetected={onDetected1} />)}
                </Paper>
            </header>
            <form onSubmit={handleSubmitPage2}>
                <div className="App">
                    <header className="App-header">

                        <Box
                            sx={{ minWidth: 120, marginBottom: "20px", }}
                        >

                            <FormControl variant="outlined">
                                <InputLabel htmlFor="Tag">Tag Number</InputLabel>
                                <OutlinedInput
                                    id="Tag"
                                    name="Tag"
                                    label="Tag Number"
                                    value={tag}
                                    onChange={(event) => {
                                        settag(event.target.value.trim());
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Button variant="contained" disableElevation onClick={() => scantag()}>
                                                Scan
                                            </Button>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <br></br><br></br>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="Tag">Serial Number</InputLabel>
                                <OutlinedInput
                                    id="Serial"
                                    name="Serial"
                                    label="Serial Number"
                                    value={serial}
                                    onChange={(event) => {
                                        setserial(event.target.value.trim());
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Button
                                                variant="contained"
                                                disableElevation
                                                onClick={() => scanserial()}
                                            >
                                                Scan
                                            </Button>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Box>
                        <Button
                            sx={{ minWidth: 120, marginBottom: "20px" }}
                            type="submit"
                            variant="contained"
                            className="App-link"
                            disabled={!tag && !serial}
                        >
                            Continue
                        </Button>
                    </header>
                </div>
            </form>
        </>
    );
}

export default Scan;
