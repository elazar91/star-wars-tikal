import React from "react";
import "./Table.scss";

const Table = (props) => {
  console.log(props);
  return (
    <table cellSpacing="0">
      <colgroup>
        <col className="hy" />
        <col span="2" />
      </colgroup>
      <tbody>
        <tr>
          <td>Vehicle name with the largest sum</td>
          <td>{props.data?.name}</td>
        </tr>
        <tr>
          <td>Related home planets and their respective population</td>
          <td>
            {props.data?.planet.name} {props.data?.sumPopulation}
          </td>
        </tr>
        <tr>
          <td>Related pilot names</td>
          <td>{props.data?.pilot.name}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
