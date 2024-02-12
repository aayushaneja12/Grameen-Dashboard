import json
import numpy as np
import pandas as pd
import plotly.express as px
import plotly.io as pio
import requests


def bcdistrict(state_query):
    
    pio.renderers.default = 'browser'

    india_districts = json.load(open("geojason final.json",'r'))

    map = {}
    for feature in india_districts['features']:
        feature['id'] = feature['properties']['GID_3']
        map[feature['properties']['NAME_3']]=feature['id']
        

    def fetch_bc_count():
        try:
            url="http://127.0.0.1:5004/api/bcmap?state="+state_query
            response = requests.get(url)
            return (response.json())
        except Exception as e:
            print(e)
            return None

    df = pd.DataFrame(fetch_bc_count(), columns=['StateName','GID_3','District','Count'])
    print(df)

    statelatlon = {'Maharashtra':[18.66328,74.800293,5.5], 'Chandigarh':[31.441482,76.768066,11], 'HimachalPradesh':[31.884206,77.571167,6.5], 'Bihar':[25.863322,84.869804,6.5], 'Assam':[26.200604,92.937574,6.2], 'Chhattisgarh':[20.995132,81.828232,5.6], 'Telangana':[18.123184,79.208824,6], 'JammuandKashmir':[33.732998,74.864273,6], 'Haryana':[29.065773,76.040497,6.35], 'ArunachalPradesh':[27.995158,93.82737,6.5], 'Manipur':[24.6637,93.9063,7], 'Odisha':[20.2376,84.2700,6.1], 'Rajasthan':[27.0238,74.2179], 'Jharkhand':[23.6913,85.2722], 'AndhraPradesh':[15.9129,79.7400], 'Lakshadweep':[11.114158,72.720374], 'Gujarat':[22.6708,71.5724], 'Nagaland':[26.1584,94.5624], 'Punjab':[31.1471,75.3412], 'UttarPradesh':[27.5706,80.0982], 'NCTofDelhi':[28.7041,77.1025], 'DamanandDiu':[20.397373,72.832802], 'Uttarakhand':[30.0668,79.0193], 'Karnataka':[15.3173,75.7139], 'Goa':[15.2993,74.124], 'Meghalaya':[25.467,91.3662], 'Tripura':[23.5639,91.6761], 'Mizoram':[23.1645,92.9376], 'Sikkim':[27.3516,88.3239], 'Kerala':[10.1632,76.6413], 'AndamanandNicobar':[10.7449,92.5000], 'Puducherry':[11.9416,79.8083], 'TamilNadu':[11.1271,78.6569], 'WestBengal':[24.51782,88.075111], 'MadhyaPradesh':[22.9734,78.6569], 'DadraandNagarHaveli':[20.1809,73.0169]}

    temp = df["StateName"][0]

    fig = px.choropleth_mapbox(
        df,
        locations="GID_3",
        geojson=india_districts,
        color='Count',
        hover_name="District",
        hover_data=["Count"],
        title="",
        mapbox_style="carto-positron",
        center={"lat": statelatlon[temp][0], "lon": statelatlon[temp][1]},
        # zoom=statelatlon["temp"][2],
        zoom = 5.25,
        opacity=1,
        color_continuous_scale='Blues',
        range_color=(-10,60)
    )
    fig.write_html("myplot.html")
    
def bcstate():
    pio.renderers.default = 'browser'

    india_districts = json.load(open("states_india.geojson",'r'))

    map = {}
    for feature in india_districts['features']:
        feature['id'] = feature['properties']['state_code']
        map[feature['properties']['st_nm']]=feature['id']
        
    def fetch_bc_count():
        try:
            url="http://127.0.0.1:5004/api/bcmap"
            response = requests.get(url)
            return (response.json())
        except Exception as e:
            print(e)
            return None

    df = pd.DataFrame(fetch_bc_count(), columns=['GID_1','State','Count'])
    print(df)
        
    fig = px.choropleth_mapbox(
        df,
        locations="GID_1",
        geojson=india_districts,
        color="Count",
        hover_name="State",
        hover_data=["Count"],
        title="",
        mapbox_style="carto-positron",
        center={"lat": 23.2937, "lon": 62.9629},
        zoom=3.45,
        opacity=1,
        color_continuous_scale='Blues',
        range_color=(-10,60)
    )
    fig.write_html("myplot.html")
    
def cropstate():
    

    india_districts = json.load(open("states_india.geojson",'r'))

    map = {}
    for feature in india_districts['features']:
        feature['id'] = feature['properties']['state_code']
        map[feature['properties']['st_nm']]=feature['id']
        
    def fetch_bc_count():
        try:
            url="http://127.0.0.1:5002/api/cropsmap"
            response = requests.get(url)
            return (response.json())
        except Exception as e:
            print(e)
            return None

    df = pd.DataFrame(fetch_bc_count(), columns=['GID_1','State','Production'])
    
        
    fig = px.choropleth_mapbox(
        df,
        locations="GID_1",
        geojson=india_districts,
        color="Production",
        hover_name="State",
        hover_data=["Production"],
        title="",
        mapbox_style="carto-positron",
        center={"lat": 23.2937, "lon": 79.9629},
        zoom=3.45,
        opacity=1,
        color_continuous_scale='Blues',
        range_color=(-10,100000000)
    )
    
    fig.write_html("myplot.html")
    
def cropdist(state_query):
    

    india_districts = json.load(open("geojason final.json",'r'))

    map = {}
    for feature in india_districts['features']:
        feature['id'] = feature['properties']['GID_3']
        map[feature['properties']['NAME_3']]=feature['id']
        

    def fetch_bc_count():
        try:
            url="http://127.0.0.1:5002/api/cropsmap?state_name="+state_query
            response = requests.get(url)
            return (response.json())
        except Exception as e:
            print(e)
            return None

    df = pd.DataFrame(fetch_bc_count(), columns=['StateName','GID_3','District','Production'])
    

    statelatlon = {'Maharashtra':[18.66328,74.800293,5.5], 'Chandigarh':[31.441482,76.768066,11], 'HimachalPradesh':[31.884206,77.571167,6.5], 'Bihar':[25.863322,84.869804,6.5], 'Assam':[26.200604,92.937574,6.2], 'Chhattisgarh':[20.995132,81.828232,5.6], 'Telangana':[18.123184,79.208824,6], 'JammuandKashmir':[33.732998,74.864273,6], 'Haryana':[29.065773,76.040497,6.35], 'ArunachalPradesh':[27.995158,93.82737,6.5], 'Manipur':[24.6637,93.9063,7], 'Odisha':[20.2376,84.2700,6.1], 'Rajasthan':[27.0238,74.2179], 'Jharkhand':[23.6913,85.2722], 'AndhraPradesh':[15.9129,79.7400], 'Lakshadweep':[11.114158,72.720374], 'Gujarat':[22.6708,71.5724], 'Nagaland':[26.1584,94.5624], 'Punjab':[31.1471,75.3412], 'UttarPradesh':[27.5706,80.0982], 'NCTofDelhi':[28.7041,77.1025], 'DamanandDiu':[20.397373,72.832802], 'Uttarakhand':[30.0668,79.0193], 'Karnataka':[15.3173,75.7139], 'Goa':[15.2993,74.124], 'Meghalaya':[25.467,91.3662], 'Tripura':[23.5639,91.6761], 'Mizoram':[23.1645,92.9376], 'Sikkim':[27.3516,88.3239], 'Kerala':[10.1632,76.6413], 'AndamanandNicobar':[10.7449,92.5000], 'Puducherry':[11.9416,79.8083], 'TamilNadu':[11.1271,78.6569], 'WestBengal':[24.51782,88.075111], 'MadhyaPradesh':[22.9734,78.6569], 'DadraandNagarHaveli':[20.1809,73.0169]}

    temp = df["StateName"][0]

    fig = px.choropleth_mapbox(
        df,
        locations="GID_3",
        geojson=india_districts,
        color='Production',
        hover_name="District",
        hover_data=['Production'],
        title="",
        mapbox_style="carto-positron",
        center={"lat": statelatlon[temp][0], "lon": statelatlon[temp][1]},
        # zoom=statelatlon["temp"][2],
        zoom = 5.25,
        opacity=1,
        color_continuous_scale='Blues',
        range_color=(-10,60)
    )
    
    fig.write_html("myplot.html")