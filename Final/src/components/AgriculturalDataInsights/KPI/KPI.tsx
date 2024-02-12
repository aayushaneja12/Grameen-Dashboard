import { useState } from "react";
import "./KPI.css";
import CIcon from "@coreui/icons-react";
import { cilCloudDownload } from "@coreui/icons";
import HTMLContent from "./HTMLContent";
import App from "./App";
import FilterDropdowns from "./FilterDropdowns";


interface StateData {
    name?: string;
    pin?: number;
    location?: string;
    acres?: number;
    crops?: number;
}



function KPI({
    data,
    selectedState,
    selectedDistrict,
    selectedCropName,
    selectedSeason,
    setSelectedState,
    setSelectedDistrict,
    setSelectedCropName,
    setSelectedSeason,
    stateOptions,
    districtOptions,
    cropNameOptions,
    seasonOptions,
}: any) {
    const [state, setState] = useState<string>("");
    const [data1, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    function onStateSelect(state: string) {
        setState(state);
        console.log(state);
    }
    return (
        <div>
            <FilterDropdowns
                data={data}
                selectedState={selectedState}
                setSelectedState={(selectedOption: typeof Option | null) => {
                    setSelectedState(
                        selectedOption || {
                            value: "All States",
                            label: "All States",
                        }
                    );
                }}
                stateOptions={stateOptions}
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={(selectedOption: typeof Option | null) => {
                    setSelectedDistrict(
                        selectedOption || {
                            value: "All Districts",
                            label: "All Districts",
                        }
                    );
                }}
                districtOptions={districtOptions}
                selectedCropName={selectedCropName}
                setSelectedCropName={(selectedOption: typeof Option | null) => {
                    setSelectedCropName(
                        selectedOption || {
                            value: "All Crops",
                            label: "All Crops",
                        }
                    );
                }}
                cropNameOptions={cropNameOptions}
                selectedSeason={selectedSeason}
                setSelectedSeason={(selectedOption: typeof Option | null) => {
                    setSelectedSeason(
                        selectedOption || {
                            value: "All Seasons",
                            label: "All Seasons",
                        }
                    );
                }}
                seasonOptions={seasonOptions}
                
            />

            <div className="custom-select">
            </div>
            <div className="kpi">
                <div className="kpi-maps">
                    <p>
                        <HTMLContent />
                    </p>
                    <p></p>
                </div>

                <div className="kpi-filters">
                    {/* {Crop Rotation Filter Starts} */}
                    <div className="crop-rotation-filters">
                        <h4>Top 5 Crop Production</h4>
                        <App
                        data={data}
                        selectedState={selectedState}
                        selectedDistrict={selectedDistrict}
                        selectedSeason={selectedSeason}
                        selectedCropName={selectedCropName}
                        selectedTopLeast={"Top 5"}
                        />
                        <h4>Least 5 Crop Production</h4>
                        <App
                        data={data}
                        selectedState={selectedState}
                        selectedDistrict={selectedDistrict}
                        selectedSeason={selectedSeason}
                        selectedCropName={selectedCropName}
                        selectedTopLeast={"Least 5"}
                        />
                    </div>
                </div>
            </div>

            {/* <div style={{width:'100%'}}><Rotation/></div> */}
        </div>
    );
}

export default KPI;
