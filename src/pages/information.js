// FormOne.js
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
    Box,
    FormControl,
    TextField,
    InputLabel,
    MenuItem,
    Select,
    InputAdornment,
    Button,
    ButtonGroup,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import DescriptionIcon from "@mui/icons-material/Description";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import Camera, { IMAGE_TYPES, FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import ImagePreview from "./imagePreview";

function Information() {
    const params = new URLSearchParams(window.location.search);
    const const1 = params.get("tag");
    const const2 = params.get("serial");
    const const3 = params.get("site");
    const const4 = params.get("response");
    const [Response, setResponse] = useState([]);
    const [status, setStatus] = useState("");
    const [remarks, setRemarks] = useState("");
    const [dataUri, setDataUri] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const cameraRef = useRef(null);
    const [dataUri1, setDataUri1] = useState(null);
    const [showCamera1, setShowCamera1] = useState(false);
    const cameraRef1 = useRef(null);
    const [dataUri2, setDataUri2] = useState(null);
    const [showCamera2, setShowCamera2] = useState(false);
    const cameraRef2 = useRef(null);
    const isFullscreen = false;
    const [LatitudeAsset, setLatitudeAsset] = useState("");
    const [LongitudeAsset, setLongitudeAsset] = useState("");
    const [assettimestamp, setAssettimestamp] = useState("");
    const [tagtimestamp, setTagtimestamp] = useState("");
    const [serialtimestamp, setSerialtimestamp] = useState("");
    const [assetcate, setAssetcate] = useState("");
    const [assetcateother, setAssetcateother] = useState("");
    const [assetdesc, setAssetdesc] = useState("");
    const [assetdescother, setAssetdescother] = useState("");
    const [Manufacturer, setManufacturer] = useState("");
    const [Manufacturerother, setManufacturerother] = useState("");
    // const [LatitudeSerial, setLatitudeSerial] = useState('');
    // const [LongitudeSerial, setLongitudeSerial] = useState('');
    // const [LatitudeTag, setLatitudeTag] = useState('');
    // const [LongitudeTag, setLongitudeTag] = useState('');
    // const [id, setId] = useState('');

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitudeAsset(position.coords.latitude);
                setLongitudeAsset(position.coords.longitude);
            });
        }
    };
    // const getLocation1 = () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             setLatitudeSerial(position.coords.latitude);
    //             setLongitudeSerial(position.coords.longitude);
    //         });
    //     }
    // };
    // const getLocation2 = () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             setLatitudeTag(position.coords.latitude);
    //             setLongitudeTag(position.coords.longitude);
    //         });
    //     }
    // };
    function handleTakePhotoAnimationDone(dataUri) {
        console.log("takePhoto", dataUri);
        setDataUri(dataUri);
        setShowCamera(false);
        getLocation();
        setAssettimestamp(new Date());
    }
    function handleTakePhotoAnimationDone1(dataUri1) {
        console.log("takePhoto", dataUri1);
        setDataUri1(dataUri1);
        setShowCamera1(false);

        setSerialtimestamp(new Date());
        // getLocation1();
    }
    function handleTakePhotoAnimationDone2(dataUri2) {
        console.log("takePhoto", dataUri2);
        setDataUri2(dataUri2);
        setShowCamera2(false);
        setTagtimestamp(new Date());
        // getLocation2();
    }
    function handleCaptureClick() {
        setShowCamera(true);
        setShowCamera1(false);
        setShowCamera2(false);
    }
    function handleCaptureClick1() {
        setShowCamera(false);
        setShowCamera1(true);
        setShowCamera2(false);
    }
    function handleCaptureClick2() {
        setShowCamera(false);
        setShowCamera1(false);
        setShowCamera2(true);
    }

    const handleUpdateClick = async (e) => {
        e.preventDefault();
        const url = "https://pvback.onrender.com/api/check/pvupdate";
        const obj = {};
        obj["id"] = Response["_id"];
        obj["status"] = status;
        obj["latitude"] = LatitudeAsset;
        obj["longitude"] = LongitudeAsset;
        obj["dataUri"] = dataUri;
        obj["dataUri1"] = dataUri1;
        obj["dataUri2"] = dataUri2;
        obj["remarks"] = remarks;
        obj["assettimestamp"] = assettimestamp;
        obj["tagtimestamp"] = tagtimestamp;
        obj["serialtimestamp"] = serialtimestamp;

        const updateResponse = await axios.post(url, obj);
        alert(updateResponse.data);
        window.location.href = "/";
    };
    const handleUpdateClick1 = async (e) => {
        e.preventDefault();

        const url = "https://pvback.onrender.com/api/check/pvnew";
        const obj = {};
        obj["assetcate"] = assetcate === 'Other' ? assetcateother : assetcate;
        obj["assetdesc"] = assetdesc === 'Other' ? assetdescother : assetdesc;
        obj["Manufacturer"] = Manufacturer === 'Other' ? Manufacturerother : Manufacturer;
        obj["status"] = status;
        obj["latitude"] = LatitudeAsset;
        obj["longitude"] = LongitudeAsset;
        obj["dataUri"] = dataUri;
        obj["dataUri1"] = dataUri1;
        obj["dataUri2"] = dataUri2;
        obj["remarks"] = remarks;
        obj["assettimestamp"] = assettimestamp;
        obj["tagtimestamp"] = tagtimestamp;
        obj["serialtimestamp"] = serialtimestamp;
        obj["site"] = const3;
        obj["tagnumber"] = const1;
        obj["serialnumber"] = const2;
        obj["reconcilation"] = const4 === "Exists in FAR" ? "1" : "0";

        const updateResponse = await axios.post(url, obj);
        alert(updateResponse.data);
        window.location.href = "/";
    };
    const options = [
        "Air Conditioner",
        "Camera",
        "Computer Hardware",
        "Furniture & Fixtures",
        "Kitchen Equipment",
        "Miscellaneous",
        "Office Equipment",
        "Phone",
        "Plant Equipment",
        "Television",
        "Vehicles",
        "7/8 feeder cable",
"A/C",
"Access Control Reader",
"Access ladder",
"Antenna Bracket",
"Antenna Mount",
"Antenna system",
"ATS",
"Battery Cabinet",
"BBU Rack",
"BTS cabinet",
"Cable Tray",
"Circuit Breaker",
"Combiner",
"DCCU",
"DCDB(DC Distribution Box)",
"DCDU",
"DDF",
"Dock",
"Dome Camera",
"Fence",
"FM200 Control Panel",
"FM200 Cylinder",
"Fuel Tank",
"Gate(Main Security Gate)",
"Generator",
"ICoupler",
"indoor antenna system",
"Lock system",
"Low fuel alarm Tank",
"MCCB",
"MDB ",
"MTS",
"MW Rack",
"NCCU",
"ODF",
"ODU",
"OSN Chassis",
"OSN Rack ",
"PDB",
"PMU",
"Power DCDU",
"Power Distribution Box",
"Power injector",
"Power meter",
"power supply system ",
"power system Battery",
"power system Module",
"Power System Subrack",
"RCU",
"Rectifier Module",
"Repeater",
"RRU Rack",
"Shelter",
"Smart Bias",
"Smoke Sensor T",
"Solar Power Controller",
"solar power Panel",
"Solar Supply System",
"Splitter",
"Tcoupler",
"Tower",
"Tower light"
    ];
    const optionsdesc1 = {
        "Air Conditioner": ["Ac Generator",
            "Split Air Conditioner",
            "Window A.C."
        ],
        "Camera": [" Ip Dome "],
        "Computer Hardware": ["4G Dongles",
            "Fax",
            "Cisco Consol",
            "Computer Peripherals- One Touch",
            "CPU",
            "Hard Disk Drive",
            "Laptop",
            "Docking Station",
            "Logitech Keyboard/Mouse",
            "Monitor",
            "Printer",
            "Router",
            "Server",
            "Server Rack",
            "Speakers",
            "Switch",
            "Tape Drive",
            "UPS",
            "Video Conferencing Device",
            "Webcam"
        ],
        "Furniture & Fixtures": ["Almirah",
            "Bed",
            "Blinds",
            "Book Shelf",
            "Cabinets",
            "Centre Table",
            "Chair Without Cushion",
            "Chairs",
            "Computer Table",
            "Conference Table",
            "Desks",
            "Dining Table",
            "Filing Cabinet",
            "Garden Furniture",
            "Glass Windows & Door Closer",
            "Perforator",
            "Planter",
            "Rack",
            "Round Table",
            "Safe",
            "Security Film",
            "Side Board",
            "Side Table",
            "Sofa",
            "Sofa Chair",
            "Sofa Cum Bed",
            "Sun Longer With Cushion",
            "Swimming Pool Furniture",
            "Table",
            "Wooden Box",
            "Wooden Cabinet"
        ],
        "Kitchen Equipment": ["Coffee Maker",
            "Microwave",
            "Refrigerator",
            "Tea Boiler",
            "Trolley", "Water Cooler",
        ],
        "Miscellaneous": ["Aquatech Pressure Tank",
            "Bms",
            "Car Air Purifier",
            "Carpet",
            "Excersize Bicycle",
            "Flood Lights",
            "Geyser With Fittings",
            "Ice Maker",
            "Microphone ",
            "Microwave Oven ",
            "Power Capacitor",
            "Pressure Tank",
            "Pump",
            "Rack",
            "Rug",
            "Security Camera",
            "T T Table",
            "T V Trolley",
            "Vaccum Cleaner",
            "Water Boiler",
            "Water Cooler",
            "Water Pump"],
        "Office Equipment": ["Access Point Model",
            "Air Circuit Breaker",
            "Air Cleaner",
            "Audio Amplifier",
            "Bose Audio System",
            "Camera",
            "Cisco Access Point ",
            "Cisco Firewall",
            "Cisco Wireless Access Point",
            "Compactor",
            "Cooking Range",
            "Dictating Machine",
            "Dry Vacumn Cleaner",
            "Flip Chart Board",
            "Geyser",
            "Hd System",
            "Hvac",
            "Jabra Speak",
            "Microphone",
            "Microwave Oven",
            "Paper Shredder",
            "Photocopier",
            "Polycom Sound Station",
            "Projector",
            "Room Alert, Environment Monitoring Device",
            "Room Heater",
            "Security Access Controls",
            "Single Monitor Arm Clamp",
            "Smoke Detectors",
            "Sony Data Projector",
            "Television",
            "Treadmill",
            "Typewriter",
            "Vacuum Cleaner",
            "Variable Frequency Drive",
            "Video Conferencing Equipment",
            "Wall Mounted Fans",
            "Washing Machine",
            "Water Boiler",
            "Wireless Controller"],
        "Phone": ["Analog Phone Sets Uniden As7403",
            "Apple Phone",
            "Cisco Phone",
            "Conference Phone",
            "Mobile Phones",
        ],
        "Plant Equipment": ["AHU Unit",
            "Battery Charger",
            "Blue Star Water Cooler",
            "Catalyst Switch Stack",
            "Chiller",
            "Electrical Panel",
            "Energy Mgmt System",
            "Fan Coil Unit",
            "Fire Panel",
            "Generator",
            "Generator Battery Charger",
            "Generator Distribution Board",
            "Ms Tanks",
            "Panel",
            "Pressure Pump",
            "Security Access Controls",
            "Stabilizer",
            "Switch",
            "Transformer ",
            "Water Cooler",
            "Water Filter - Sand",
            "Water Softner",
            "Water System"],
        "Television": ["Samsung Television ",
            "Sony Television",
            "Television "],
        "Vehicles": ["Honda Scoote",
            "Toyota Altis",
            "Toyota Corolla",
            "Toyota Innova"]
    };
    const optionsdesc = optionsdesc1[assetcate] || [];
    const optionsmanu = [
        "ABCD",
        "CDEF",
        "EFGH",
        "HIJK",
        "JKLM",
        "Other"
    ];

    useEffect(() => {
        async function fetchData() {
            if (const4 === "Already existed in PV reconciled with Far") {
                const url = "https://pvback.onrender.com/api/check/pvcheck";
                const farResponse = await axios.get(url, {
                    params: {
                        tag: const1,
                        serial: const2,
                    },
                });
                setResponse(farResponse.data);
                setStatus(farResponse.data["Asset Status"]);
                setRemarks(farResponse.data["Remark"]);
                setDataUri(farResponse.data["Asset Image"]);
                setDataUri2(farResponse.data["Tag Image"]);
                setDataUri1(farResponse.data["Serial Number Image"]);
                setLatitudeAsset(farResponse.data["Latitude"]);
                setLongitudeAsset(farResponse.data["Longitude"]);
                setAssettimestamp(farResponse.data["Asset Timestamp"]);
                setTagtimestamp(farResponse.data["Tag Timestamp"]);
                setSerialtimestamp(farResponse.data["Serial Timestamp"]);
                // setId(farResponse.data['_id']);
            }
        }

        fetchData();
    }, [const4, const1, const2]);
    return const4 === "Already existed in PV reconciled with Far" ? (
        <form>
            <div className="App">
                <header className="App-header">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <h2 style={{ minWidth: 150, marginBottom: "20px", color: "Black" }}>
                            Asset Information
                        </h2>
                    </div>
                    <Box sx={{ minWidth: 150, marginBottom: "20px" }}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
                            <TextField
                                id="input-with-icon-textfield"
                                label="Asset Category"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CategoryIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                                value={Response["Asset Category"]}
                                style={{ marginBottom: "20px" }}
                            />
                            <TextField
                                id="input-with-icon-textfield"
                                label="Asset Description"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DescriptionIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                                value={Response["Asset Description"]}
                                style={{ marginBottom: "20px" }}
                            />
                            <TextField
                                id="input-with-icon-textfield"
                                label="Manufacturer Name"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PrecisionManufacturingIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                                value={Response["Manufacturer Name"]}
                                style={{ marginBottom: "20px" }}
                            />
                        </FormControl>
                        <br />
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
                            <InputLabel id="demo-simple-select-label">
                                Asset Status
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Asset Status"
                                value={status}
                                onChange={(event) => {
                                    setStatus(event.target.value);
                                }}
                            >
                                <MenuItem value="Installed">Installed</MenuItem>
                                <MenuItem value="Damaged">Damaged</MenuItem>
                                <MenuItem value="Dismantled">Dismantled</MenuItem>
                            </Select>
                        </FormControl>

                        <br />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <ButtonGroup
                                size="medium"
                                aria-label="large button group"
                                sx={{ m: 1, minWidth: 300 }}
                            >
                                <Button onClick={handleCaptureClick}>Asset</Button>
                                <Button onClick={handleCaptureClick1} disabled={!const2}>
                                    Serial No.
                                </Button>
                                <Button onClick={handleCaptureClick2} disabled={!const1}>
                                    Tag Number
                                </Button>
                            </ButtonGroup>
                        </div>
                        {showCamera && (
                            <Camera
                                onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
                                isFullscreen={isFullscreen}
                                ref={cameraRef}
                                idealFacingMode={FACING_MODES.ENVIRONMENT}
                                idealResolution={{ width: 640, height: 480 }}
                                imageType={IMAGE_TYPES.JPG}
                                isImageMirror={false}
                                sizeFactor={1}
                            />
                        )}
                        {showCamera1 && (
                            <Camera
                                onTakePhotoAnimationDone={handleTakePhotoAnimationDone1}
                                isFullscreen={isFullscreen}
                                ref={cameraRef1}
                                idealFacingMode={FACING_MODES.ENVIRONMENT}
                                idealResolution={{ width: 640, height: 480 }}
                                imageType={IMAGE_TYPES.JPG}
                                isImageMirror={false}
                                sizeFactor={1}
                            />
                        )}
                        {showCamera2 && (
                            <Camera
                                onTakePhotoAnimationDone={handleTakePhotoAnimationDone2}
                                isFullscreen={isFullscreen}
                                ref={cameraRef2}
                                idealFacingMode={FACING_MODES.ENVIRONMENT}
                                idealResolution={{ width: 640, height: 480 }}
                                imageType={IMAGE_TYPES.JPG}
                                isImageMirror={false}
                                sizeFactor={1}
                            />
                        )}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {dataUri && (
                                <ImagePreview dataUri={dataUri} isFullscreen={isFullscreen} />
                            )}
                            {dataUri1 && (
                                <ImagePreview dataUri={dataUri1} isFullscreen={isFullscreen} />
                            )}
                            {dataUri2 && (
                                <ImagePreview dataUri={dataUri2} isFullscreen={isFullscreen} />
                            )}
                        </div>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Remarks"
                                multiline
                                rows={2}
                                value={remarks}
                                onChange={(event) => {
                                    setRemarks(event.target.value);
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Button
                        sx={{ minWidth: 120, marginBottom: "20px" }}
                        variant="contained"
                        className="App-link"
                        onClick={handleUpdateClick}
                    >
                        Update
                    </Button>
                </header>
            </div>
        </form>
    ) : (
        <form>
            <div className="App">
                <header className="App-header">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <h2 style={{ minWidth: 150, marginBottom: "20px", color: "Black" }}>
                            Asset Information
                        </h2>
                    </div>
                    <Box sx={{ minWidth: 150, marginBottom: "20px" }}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
                            {(assetcate !== 'Other' || assetcateother === 'Dropdown') && (<>   <InputLabel id="my-select-label">Asset Category</InputLabel>
                                <Select
                                    labelId="my-select-label"
                                    id="my-select"
                                    value={assetcate}
                                    style={{ marginBottom: "20px" }}
                                    onChange={(event) => {
                                        setAssetcate(event.target.value);
                                        setAssetdesc('');
                                    }}
                                    renderValue={(selected) =>
                                        selected.startsWith("Other: ")
                                            ? selected.replace("Other: ", "")
                                            : selected
                                    }
                                    MenuProps={{
                                        style: {
                                            maxHeight: "300px",
                                            maxWidth: "300px"
                                        },
                                    }}
                                >
                                    {options.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select></>
                            )}
                            {assetcate === 'Other' && assetcateother !== 'Dropdown' && (
                                <TextField
                                    id="input-with-icon-textfield"
                                    label="Asset Category"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CategoryIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                    value={assetcateother}
                                    onChange={(event) => { setAssetcateother(event.target.value); }}
                                    style={{ marginBottom: '20px' }}
                                />
                            )}
                        </FormControl>
                        {/* <TextField
                                id="input-with-icon-textfield"
                                label="Asset Description"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DescriptionIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                                value={assetdesc}
                                onChange={(event) => {
                                    setAssetdesc(event.target.value);
                                }}
                                style={{ marginBottom: "20px" }}
                            /> */}
                        <br />
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 300, maxWidth: 300 }}>
                            {(assetdesc !== 'Other' || assetdescother === 'Dropdown') && (
                                <>   <InputLabel id="my-select-label">Asset Description</InputLabel>
                                    <Select
                                        labelId="my-select-label"
                                        id="my-select"
                                        value={assetdesc}
                                        style={{ marginBottom: "20px" }}
                                        onChange={(event) => {
                                            setAssetdesc(event.target.value);
                                        }}
                                        renderValue={(selected) =>
                                            selected.startsWith("Other: ")
                                                ? selected.replace("Other: ", "")
                                                : selected
                                        }
                                        MenuProps={{
                                            style: {
                                                maxHeight: "300px",
                                                maxWidth: "300px"
                                            },
                                        }}
                                    >
                                        {optionsdesc.map((option) => (

                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </>
                            )}
                            {assetdesc === 'Other' && assetdescother !== 'Dropdown' && (
                                <TextField
                                    id="input-with-icon-textfield"
                                    label="Asset Description"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <DescriptionIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                    value={assetdescother}
                                    onChange={(event) => {
                                        setAssetdescother(event.target.value);
                                    }}
                                    style={{ marginBottom: "20px" }}
                                />
                            )}
                        </FormControl>
                        <br />
                        {/* <FormControl>
                            <TextField
                                id="input-with-icon-textfield"
                                label="Manufacturer Name"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PrecisionManufacturingIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                                value={Manufacturer}
                                onChange={(event) => {
                                    setManufacturer(event.target.value);
                                }}
                                style={{ marginBottom: "20px" }}
                            />
                        </FormControl> */}
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
                            {(Manufacturer !== 'Other' || Manufacturerother === 'Dropdown') && (
                                <>   <InputLabel id="my-select-label">Manufacturer Name</InputLabel>
                                    <Select
                                        labelId="my-select-label"
                                        id="my-select"
                                        value={Manufacturer}
                                        style={{ marginBottom: "20px" }}
                                        onChange={(event) => {
                                            setManufacturer(event.target.value);
                                        }}
                                        renderValue={(selected) =>
                                            selected.startsWith("Other: ")
                                                ? selected.replace("Other: ", "")
                                                : selected
                                        }
                                        MenuProps={{
                                            style: {
                                                maxHeight: "300px",
                                                maxWidth: "300px"
                                            },
                                        }}
                                    >
                                        {optionsmanu.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </>
                            )}
                            {Manufacturer === 'Other' && Manufacturerother !== 'Dropdown' && (
                                <TextField
                                    id="input-with-icon-textfield"
                                    label="Manufacturer Name"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PrecisionManufacturingIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                    value={Manufacturerother}
                                    onChange={(event) => {
                                        setManufacturerother(event.target.value);
                                    }}
                                    style={{ marginBottom: "20px" }}
                                />
                            )}
                        </FormControl>
                        <br />
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
                            <InputLabel id="demo-simple-select-label">
                                Asset Status
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Asset Status"
                                value={status}
                                onChange={(event) => {
                                    setStatus(event.target.value);
                                }}
                            >
                                <MenuItem value="Installed">Installed</MenuItem>
                                <MenuItem value="Damaged">Damaged</MenuItem>
                                <MenuItem value="Dismantled">Dismantled</MenuItem>
                            </Select>
                        </FormControl>

                        <br />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <ButtonGroup
                                size="medium"
                                aria-label="large button group"
                                sx={{ m: 1, minWidth: 300 }}
                            >
                                <Button onClick={handleCaptureClick}>Asset</Button>
                                <Button onClick={handleCaptureClick1} disabled={!const2}>
                                    Serial No.
                                </Button>
                                <Button onClick={handleCaptureClick2} disabled={!const1}>
                                    Tag Number
                                </Button>
                            </ButtonGroup>
                        </div>
                        {showCamera && (
                            <Camera
                                onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
                                isFullscreen={isFullscreen}
                                ref={cameraRef}
                                idealFacingMode={FACING_MODES.ENVIRONMENT}
                                idealResolution={{ width: 640, height: 480 }}
                                imageType={IMAGE_TYPES.JPG}
                                isImageMirror={false}
                                sizeFactor={1}
                            />
                        )}
                        {showCamera1 && (
                            <Camera
                                onTakePhotoAnimationDone={handleTakePhotoAnimationDone1}
                                isFullscreen={isFullscreen}
                                ref={cameraRef1}
                                idealFacingMode={FACING_MODES.ENVIRONMENT}
                                idealResolution={{ width: 640, height: 480 }}
                                imageType={IMAGE_TYPES.JPG}
                                isImageMirror={false}
                                sizeFactor={1}
                            />
                        )}
                        {showCamera2 && (
                            <Camera
                                onTakePhotoAnimationDone={handleTakePhotoAnimationDone2}
                                isFullscreen={isFullscreen}
                                ref={cameraRef2}
                                idealFacingMode={FACING_MODES.ENVIRONMENT}
                                idealResolution={{ width: 640, height: 480 }}
                                imageType={IMAGE_TYPES.JPG}
                                isImageMirror={false}
                                sizeFactor={1}
                            />
                        )}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {dataUri && (
                                <ImagePreview dataUri={dataUri} isFullscreen={isFullscreen} />
                            )}
                            {dataUri1 && (
                                <ImagePreview dataUri={dataUri1} isFullscreen={isFullscreen} />
                            )}
                            {dataUri2 && (
                                <ImagePreview dataUri={dataUri2} isFullscreen={isFullscreen} />
                            )}
                        </div>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Remarks"
                                multiline
                                rows={2}
                                value={remarks}
                                onChange={(event) => {
                                    setRemarks(event.target.value);
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Button
                        sx={{ minWidth: 120, marginBottom: "20px" }}
                        variant="contained"
                        className="App-link"
                        onClick={handleUpdateClick1}
                    >
                        Add New
                    </Button>
                </header>
            </div>
        </form >
    );
}

export default Information;
