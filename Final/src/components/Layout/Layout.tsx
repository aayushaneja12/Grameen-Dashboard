import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import './Layout.css';

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
  

function Layout() {

    return (
        <div className="wrapper">
            <aside className="sidebar">
                <div className="logo">
                    <img src="logo.png" alt="BlazingJags" />
                    <h1>BlazingJags</h1>
                </div>
                <div className="links">
                    <ul>
                        <li>
                            <NavLink to="/agriculturaldatainsights">Agricultural Data Insights</NavLink>
                        </li>
                        <li>
                            <NavLink to="/underconstruction">Demographic and Socio-Economic Analysis</NavLink>
                        </li>
                        <li>
                            <NavLink to="/">BC Agent Network</NavLink>
                        </li>
                        <li>
                            <NavLink to="/">Financial Infrastructure Availability</NavLink>
                        </li>
                        <li>
                            <NavLink to="/">Market Potential</NavLink>
                        </li>
                        <li>
                            <NavLink to="/">Risk and Vulnerability Mapping</NavLink>
                        </li>
                        <li>
                            <NavLink to="/">Loan Customer Behavior Mapping</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="support">
                    <h4>Support</h4>
                    <p>This is an email form. Response can take upto 24 hours</p>
                    <button className="btn-primary btn-w100">Need Help?</button>
                </div>
            </aside>
            <section className="content">
                <Outlet />
            </section>
        </div>
    );
};

export default Layout;