import React from "react";

function TableHeader(props) {
  return (
    <thead>
      <tr className="text-center align-middle">
        <th>No</th>
        {props.dataRow &&
          props.dataRow.map((item, idx) => {
            return <th key={idx + 1}>{item}</th>;
          })}
      </tr>
    </thead>
  );
}

export default TableHeader;
