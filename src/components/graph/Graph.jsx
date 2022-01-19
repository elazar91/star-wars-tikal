import React from "react";
import style from "./Graph.module.scss";

const Graph = (props) => {
  if (props.planets)
    console.log(
      props.planets[0].population / 200000,
      props.planets[1].population / 200000,
      props.planets[5].population / 200000,
      props.planets[6].population / 200000,
      props.planets[7].population / 200000
    );
  if (props.planets) {
    return (
      <div className={style.wrapGraph}>
        <div className={style.wrapPlanet}>
          <div>{props.planets[0].population}</div>
          <div
            className={style.graphNumber}
            style={{
              height: `${props.planets[0].population / 2000000 + 50}px`,
            }}
          ></div>
          <div className={style.name}>{props.planets[0].name} s</div>
        </div>

        <div className={style.wrapPlanet}>
          <div>{props.planets[1].population}</div>
          <div
            className={style.graphNumber}
            style={{
              height: `${props.planets[1].population / 20000000 + 50}px`,
            }}
          ></div>
          <div className={style.name}>{props.planets[1].name}</div>
        </div>

        <div className={style.wrapPlanet}>
          <div>{props.planets[5].population}</div>
          <div
            className={style.graphNumber}
            style={{
              height: `${props.planets[5].population / 2000000 + 50}px`,
            }}
          ></div>
          <div className={style.name}>{props.planets[5].name}</div>
        </div>

        <div className={style.wrapPlanet}>
          <div>{props.planets[6].population}</div>
          <div
            className={style.graphNumber}
            style={{
              height: `${props.planets[6].population / 2000000 + 50}px`,
            }}
          ></div>
          <div className={style.name}>{props.planets[6].name}</div>
        </div>

        <div className={style.wrapPlanet}>
          <div>{props.planets[7].population}</div>
          <div
            className={style.graphNumber}
            style={{
              height: `${props.planets[7].population / 20000000 + 50}px`,
            }}
          ></div>
          <div className={style.name}>{props.planets[7].name}</div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Graph;
