import React from "react";

const Table = (props) => {
  console.log(props);
  return (
    <div>
      Vehicle name with the largest sum: {props.population?.sumPopulation}
      <div>
        Related home planets and their respective {props.population?.name}
        <br />
        population:
        {props.population?.sumPopulation}
      </div>
    </div>
  );
};

export default Table;
