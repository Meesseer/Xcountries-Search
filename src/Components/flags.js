import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";

function CountryCard({ name, image, abbr }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "200px",
        height: "200px",
        border: "2px solid gray",
        borderRadius: "5px",
        alignItems: "center",
        flexWrap: "nowrap",
      }}
    >
      <img
        style={{ width: "100px", height: "100px", margin: "0 auto" }}
        src={image}
        alt="Country Flag"
      />
      <h3>{name}</h3>
      <p>{abbr}</p>
    </div>
  );
}

function Flags() {
  const [flagData, setFlagData] = useState([]);

  const fetch = async () => {
    try {
      const response = await axios.get(
        `https://xcountries-backend.azurewebsites.net/all`
      );
      const data = response.data;
      console.log(data);
      setFlagData(data);
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    fetch();
  });

  return (
    <div>
      style=
      {{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
      }}
      {flagData.map((flag, index) => (
        <CountryCard
          key={index}
          name={flag.name}
          image={flag.flag}
          abbr={flag.abbr}
        />
      ))}
    </div>
  );
}

export default Flags;
