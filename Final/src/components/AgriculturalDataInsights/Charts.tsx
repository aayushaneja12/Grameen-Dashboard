import "./Charts.css";
import { useState } from "react";
import CirclePackingChart from "./CirclePackingChart";
import ScatterPlotWithProductivity from "./ScatterPlotWithProductivity";
import PolarAreaChart from "./PolarAreaChart";
import React, { MouseEventHandler } from "react";

interface Seasons {
  imageUrl?: string;
  title?: string;
  handleFunction?: MouseEventHandler<HTMLButtonElement>;
}

function Charts() {
  const seasons: Seasons[] = [
    {
      imageUrl: "frame1.png",
      title: "Type 1",
      handleFunction: handleCirclePackingChart,
    },
    {
      imageUrl: "frame2.png",
      title: "Type 2",
      handleFunction: handlePolarChart,
    },
    {
      imageUrl: "frame3.png",
      title: "Type 3",
      handleFunction: handleScatterPlotWithProductivity,
    },
    {
      imageUrl: "frame4.png",
      title: "Type 4",
      handleFunction: handlePic1,
    },
    {
      imageUrl: "frame5.png",
      title: "Type 5",
      handleFunction: handlePic2,
    },
    {
      imageUrl: "frame6.png",
      title: "Type 6",
      handleFunction: handlePic3,
    },
  ];

  const [graph, setGraph] = useState("initialGraph");

  function handleCirclePackingChart() {
    setGraph("circlePackingChart");
  }

  function handlePolarChart() {
    setGraph("polarChart");
  }

  function handleScatterPlotWithProductivity() {
    setGraph("scatterPlotWithProductivity");
  }

  function handlePic1() {
    setGraph("pic1");
  }

  function handlePic2() {
    setGraph("pic2");
  }

  function handlePic3() {
    setGraph("pic3");
  }

  return (
    <div>
      <header className="header">
        <h1>Data Insights (AI/ML)</h1>
        <div className="header-actions"></div>
      </header>
      <section className="data-chart">
        {seasons.map((season, index) => {
          return (
            <button onClick={season.handleFunction}>
              {/* <div key={index} className='data-chart-card'>
                            <img src={season.imageUrl} alt={season.title}/>
                            <p>{season.title}</p>
                        </div> */}
              <img src={season.imageUrl} alt={season.title} />
            </button>
          );
        })}
      </section>

      {graph === "circlePackingChart" && (
        // <CirclePackingChart cropData={data}/>
        <div></div>
      )}

      {graph === "polarChart" && (
        <div></div>

        //  <PolarAreaChart data={data} />
      )}

      {graph === "scatterPlotWithProductivity" && (
        <div></div>

        // <ScatterPlotWithProductivity data={data} />
      )}

      {graph === "pic1" && (
        <div>
          <img className="graph-image" src="pic1.jpg" width="100" height="100" />
        </div>

        // <ScatterPlotWithProductivity data={data} />
      )}

      {graph === "pic2" && (
        <div>
                    <img className="graph-image" src="pic2.jpg" width="100" height="100" />

        </div>

        // <ScatterPlotWithProductivity data={data} />
      )}

      {graph === "pic3" && (
        <div>
                    <img className="graph-image" src="pic3.png" width="100" height="100" />

        </div>

        // <ScatterPlotWithProductivity data={data} />
      )}
    </div>
  );
}

export default Charts;
