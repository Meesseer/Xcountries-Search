import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";

function CountryCard({ name, image, abbr }) {
  return (
    <div
      className="countryCard"
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
        alt={name}
      />
      <h3>{name}</h3>
      <p>{abbr}</p>
    </div>
  );
}

function Flags() {
  const [flagData, setFlagData] = useState([]);
  const [search, setSearch] = useState("")

  const searchCountry = (e) => {
    setSearch(e.target.value)
  }

  const filteredCountries = flagData.filter((flag) =>
    flag.name.common.toLowerCase().includes(search.toLowerCase())
  )

  const fetch = async () => {
    try {
      const response = await axios.get(
        ` https://restcountries.com/v3.1/all`
      );
      const data = response.data;
      console.log(data);
      setFlagData(data);
    } catch (error) {
      console.error("Error fetching data:", error.response);
    }
  };

  useEffect(() => {
    fetch();
  },[]);

  return (
  <div>
    <input type="text" style={{margin: "14px", width:"50%"}}placeholder="Search Your Country Here!" onChange={searchCountry}></input>
    <div
    style=
      {{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
      }}>
      {filteredCountries.map((flag, index) => (
        <CountryCard
          key={index}
          name={flag.name.common}
          image={flag.flags.png}
          abbr={flag.abbr}
        />
      ))}
    </div>
  </div>
  );
}

export default Flags;
