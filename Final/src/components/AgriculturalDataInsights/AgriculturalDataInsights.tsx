import CIcon from "@coreui/icons-react";
import { cilBell } from "@coreui/icons";
import "./AgriculturalDataInsights.css";
import KPI from "./KPI/KPI";
import FilterDropdowns from "./KPI/FilterDropdowns";
import React, { useEffect, useState } from "react";
import Charts from './Charts';


interface Seasons {
    imageUrl?: string;
    title?: string;
    mt?: number;
    hectares?: number;
}

// Define the shape of your option objects
interface Option {
    value: string;
    label: string;
}

// Define the shape of your data items if you have a predefined structure
interface DataItem {
    // Define the properties and types, for example:
    state: string;
    district: string;
    crop_name: string;
    season: string;
    // ... any other properties that your data items have
}

interface CropData {
    state: string;
    district: string;
    crop_name: string;
    season: string;
    [key: string]: any;
    // ... any other properties that your crop data items have
}



// type OptionType = ValueType<Option, false>;

function AgriculturalDataInsights() {
    const [cropData, setCropData] = useState<null | DataItem[]>(null);
    const [selectedState, setSelectedState] = useState<Option>({
        value: "All States",
        label: "All States",
    });
    const [selectedDistrict, setSelectedDistrict] = useState<Option>({
        value: "All Districts",
        label: "All Districts",
    });
    const [selectedCropName, setSelectedCropName] = useState<Option>({
        value: "All Crops",
        label: "All Crops",
    });
    const [selectedSeason, setSelectedSeason] = useState<Option>({
        value: "All Seasons",
        label: "All Seasons",
    });
    const [stateOptions, setStateOptions] = useState<Option[]>([]);
    const [districtOptions, setDistrictOptions] = useState<Option[]>([]);
    const [cropNameOptions, setCropNameOptions] = useState<Option[]>([]);
    const [seasonOptions, setSeasonOptions] = useState<Option[]>([]);
    const [data, setData] = useState<DataItem[]>([]);
    const [chartTitle, setChartTitle] = useState<string>(
        "Crop Production Data"
    );
    const [analyticsData, setAnalyticsData] = useState<DataItem[]>([]);
    const [noAnalytics, setNoAnalytics] = useState<boolean>(false);
    const [count, setCount] = useState(0)
    // const [selectedOption, setSelectedOption] = useState<OptionType>(null);

    useEffect(() => {
        if (data) {
            // Create unique options for dropdowns
            const createOptions = (
                data: CropData[],
                key: string
            ): { value: string; label: string }[] => {
                const uniqueValues = Array.from(
                    new Set(data.map((item) => item[key]))
                ).sort();
                return uniqueValues.map((value) => ({ value, label: value }));
            };

            // Set options for the Select components
            setStateOptions(createOptions(data, "state"));
            setDistrictOptions(createOptions(data, "district"));
            setCropNameOptions(createOptions(data, "crop_name"));
            setSeasonOptions(createOptions(data, "season"));
        }
    }, [data]);

    

    // Effect to update dependent dropdown options and chart title based on selections
    useEffect(() => {
        // Update the district options based on the selected state
        if (selectedState && selectedState.value !== "All States") {
            const filteredDistricts = data
                .filter((item) => item.state === selectedState.value)
                .map((item) => item.district);
            const uniqueDistricts = Array.from(new Set(filteredDistricts));
            setDistrictOptions([
                { value: "All Districts", label: "All Districts" },
                ...uniqueDistricts.map((district) => ({
                    value: district,
                    label: district,
                })),
            ]);
        } else {
            // Reset district options if 'All States' is selected
            setDistrictOptions([
                { value: "All Districts", label: "All Districts" },
            ]);
        }

        // Always update the crop name options, independent of state or district selection
        const filteredCrops =
            selectedDistrict && selectedDistrict.value !== "All Districts"
                ? data
                      .filter(
                          (item) => item.district === selectedDistrict.value
                      )
                      .map((item) => item.crop_name)
                : data.map((item) => item.crop_name);
        const uniqueCrops = Array.from(new Set(filteredCrops));
        setCropNameOptions([
            { value: "All Crops", label: "All Crops" },
            ...uniqueCrops.map((crop) => ({ value: crop, label: crop })),
        ]);

        // Always update the season options, independent of crop name selection
        const filteredSeasons =
            selectedCropName && selectedCropName.value !== "All Crops"
                ? data
                      .filter(
                          (item) => item.crop_name === selectedCropName.value
                      )
                      .map((item) => item.season)
                : data.map((item) => item.season);
        const uniqueSeasons = Array.from(new Set(filteredSeasons));
        setSeasonOptions([
            { value: "All Seasons", label: "All Seasons" },
            ...uniqueSeasons.map((season) => ({
                value: season,
                label: season,
            })),
        ]);

        // Conditional logic for no analytics available
        const analyticsAvailable = data && data.length > 0;
        setNoAnalytics(!analyticsAvailable);

        // Update chart title based on selections
        let title = "Crop Production Data";
        if (selectedState && selectedState.value !== "All States") {
            title = `Production Data for ${selectedState.label}`;
        }
        if (selectedDistrict && selectedDistrict.value !== "All Districts") {
            title = `Production Data for ${selectedDistrict.label}, ${selectedState.label}`;
        }
        if (selectedCropName && selectedCropName.value !== "All Crops") {
            title = `Production Data for ${selectedCropName.label}`;
        }
        if (selectedSeason && selectedSeason.value !== "All Seasons") {
            title = `Production Data for ${selectedSeason.label} Season`;
        }
        setChartTitle(title);

        // Set analytics data based on selections
        let filteredData = data;
        if (selectedState && selectedState.value !== "All States") {
            filteredData = filteredData.filter(
                (item) => item.state === selectedState.value
            );
        }
        if (selectedDistrict && selectedDistrict.value !== "All Districts") {
            filteredData = filteredData.filter(
                (item) => item.district === selectedDistrict.value
            );
        }
        if (selectedCropName && selectedCropName.value !== "All Crops") {
            filteredData = filteredData.filter(
                (item) => item.crop_name === selectedCropName.value
            );
        }
        if (selectedSeason && selectedSeason.value !== "All Seasons") {
            filteredData = filteredData.filter(
                (item) => item.season === selectedSeason.value
            );
        }
        setAnalyticsData(filteredData);
    }, [
        selectedState,
        selectedDistrict,
        selectedCropName,
        selectedSeason,
        data
    ]);

    // const fetchData = (query: string): void => {
    //     fetch(query)
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error("Network response was not ok");
    //             }
    //             return response.json();
    //         })
    //         .then((data: CropData[]) => {
    //             setData(data);
    //             console.log(data);
    //         })
    //         .catch((error) => console.error("Error fetching data: ", error));
    // };



    const fetchData = (query: string) => {
        fetch(query)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((error) => console.error("Error fetching data: ", error));
    };

    useEffect(() => {
        let query = "http://127.0.0.1:5001/api/crops?";
        if (selectedState.value !== "All States") {
            query += `state_name=${encodeURIComponent(selectedState.value)}&`;
        }
        if (selectedDistrict.value !== "All Districts") {
            query += `district_name=${encodeURIComponent(
                selectedDistrict.value
            )}&`;
        }
        if (selectedCropName.value !== "All Crops") {
            query += `crop=${encodeURIComponent(selectedCropName.value)}&`;
        }
        if (selectedSeason.value !== "All Seasons") {
            query += `season=${encodeURIComponent(selectedSeason.value)}&`;
        }

        fetchData(query);
        // console.log(query);
    }, [selectedState, selectedDistrict, selectedCropName, selectedSeason]);

    const seasons: Seasons[] = [
        {
            imageUrl: "allyear.png",
            title: "All Year",
            mt: 994854,
            hectares: 56565,
        },
        {
            imageUrl: "summer.png",
            title: "Summer",
            mt: 994854,
            hectares: 56565,
        },
        {
            imageUrl: "kharif.png",
            title: "Kharif",
            mt: 994854,
            hectares: 56565,
        },
        {
            imageUrl: "winter.png",
            title: "Winter",
            mt: 994854,
            hectares: 56565,
        },
        {
            imageUrl: "rabi.png",
            title: "Rabi",
            mt: 994854,
            hectares: 56565,
        },
        {
            imageUrl: "autumn.png",
            title: "Autumn",
            mt: 994854,
            hectares: 56565,
        },
    ];
    return (
        <div>
            <header className="header">
                <h1>Agricultural Data Insights</h1>
                {/* <FilterDropdowns
                    data={cropData}
                    selectedState={selectedState}
                    setSelectedState={(selectedOption: Option | null) => {
                        setSelectedState(
                            selectedOption || {
                                value: "All States",
                                label: "All States",
                            }
                        );
                    }}
                    stateOptions={stateOptions}
                    selectedDistrict={selectedDistrict}
                    setSelectedDistrict={(selectedOption: Option | null) => {
                        setSelectedDistrict(
                            selectedOption || {
                                value: "All Districts",
                                label: "All Districts",
                            }
                        );
                    }}
                    districtOptions={districtOptions}
                    selectedCropName={selectedCropName}
                    setSelectedCropName={(selectedOption: Option | null) => {
                        setSelectedCropName(
                            selectedOption || {
                                value: "All Crops",
                                label: "All Crops",
                            }
                        );
                    }}
                    cropNameOptions={cropNameOptions}
                    selectedSeason={selectedSeason}
                    setSelectedSeason={(selectedOption: Option | null) => {
                        setSelectedSeason(
                            selectedOption || {
                                value: "All Seasons",
                                label: "All Seasons",
                            }
                        );
                    }}
                    seasonOptions={seasonOptions}
                /> */}
                <div className="header-actions">
                    <div className="icon">
                        <CIcon icon={cilBell} size="sm" />
                    </div>
                    <div className="profile">
                        <span className="profile-icon"></span>
                        <p>Trisha</p>
                    </div>
                </div>
            </header>
            <section className="seasons">
                {seasons.map((season, index) => {
                    return (
                        <div key={index} className="season-card">
                            <img src={season.imageUrl} alt={season.title} />
                            <div className="season-detail">
                                <p>{season.title}</p>
                                <span>{season.mt} MT</span>
                                <span>{season.hectares} Hectares</span>
                            </div>
                        </div>
                    );
                })}
            </section>
            <KPI
                data={analyticsData}
                selectedState={selectedState}
                selectedDistrict={selectedDistrict}
                selectedSeason={selectedSeason}
                selectedCropName={selectedCropName}
                setSelectedState={setSelectedState}
                setSelectedDistrict={setSelectedDistrict}
                setSelectedCropName={setSelectedCropName}
                setSelectedSeason={setSelectedSeason}
                stateOptions={stateOptions}
                districtOptions={districtOptions}
                cropNameOptions={cropNameOptions}
                seasonOptions={seasonOptions}
            />
            {/* <Charts                 
                data={analyticsData}
                selectedState={selectedState}
                selectedDistrict={selectedDistrict}
                selectedSeason={selectedSeason}
                selectedCropName={selectedCropName}
            /> */}

        </div>
    );
}

export default AgriculturalDataInsights;
