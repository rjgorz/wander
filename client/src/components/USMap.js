import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";
import { Sticky } from "semantic-ui-react";
import UserContext from "./Context"


import allStates from "../states.json";

// const geoUrl = "../geoData.json";
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
};

const MapChart = ({ currState, setCurrState, setUserJournals }) => {
  const user = useContext(UserContext);

  useEffect(() => {
    fetch(`/user_journals/${user.id}`)
      .then((r) => r.json())
      .then((journals) => setUserJournals(journals))
  }, [user, setUserJournals]);

  if (user.id === 0) {
    return <h1>LOADING...</h1>
  } else {
    const uniqueStates = []
    for (const state of user.states) {
      if (!uniqueStates.includes(state.name)) {
        uniqueStates.push(state.name)
      }
    }

    return (
      <div>
        <Sticky offset={70}>
          <h2 id='state-label' className='state-selector'>{currState ? `${currState}` : 'Select a State!'}</h2>
        </Sticky>
        <ComposableMap projection="geoAlbersUsa">
          <Geographies geography={geoUrl}>
            {({ geographies }) => (
              <>
                {geographies.map(geo => (
                  <Link to={geo.properties.name} key={geo.rsmKey}>
                    <Geography
                      stroke="#fff"
                      geography={geo}
                      fill={uniqueStates.includes(geo.properties.name) ? "#FFA83B" : "#ddd"}
                      // fill={uniqueStates.includes(geo.properties.name) ? '#' + Math.floor(Math.random()*16777215).toString(16) : "#ddd"}
                      onMouseEnter={() => setCurrState(geo.properties.name)}
                      onMouseLeave={() => setCurrState(null)}
                      style={{
                        default: {
                          outline: 'none'
                        },
                        hover: {
                          outline: 'none'
                        },
                        pressed: {
                          outline: 'none'
                        }
                      }}
                    />
                  </Link>
                ))}
                {geographies.map(geo => {
                  const centroid = geoCentroid(geo);
                  const cur = allStates.find(s => s.val === geo.id);
                  return (
                    <Link to={geo.properties.name} key={geo.rsmKey + "-name"}>
                      <g
                        onMouseEnter={() => setCurrState(geo.properties.name)}
                        onMouseLeave={() => setCurrState(null)}
                      >
                        {cur &&
                          centroid[0] > -160 &&
                          centroid[0] < -67 &&
                          (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                            <Marker coordinates={centroid}>
                              <text y="2" fontSize={14} textAnchor="middle" >
                                {cur.id}
                              </text>
                            </Marker>
                          ) : (
                            <Annotation
                              subject={centroid}
                              dx={offsets[cur.id][0]}
                              dy={offsets[cur.id][1]}
                            >
                              <text x={4} fontSize={14} alignmentBaseline="middle" >
                                {cur.id}
                              </text>
                            </Annotation>
                          ))}
                      </g>
                    </Link>
                  );
                })}
              </>
            )}
          </Geographies>
        </ComposableMap>
      </div>
    );
  }
};

export default MapChart;
