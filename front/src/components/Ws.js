import React, { useEffect, useState } from "react";
import axios from "axios";

const Ws = () => {
  const [cards, setCards] = useState([]);
  const [tcg, setTcg] = useState("ws");
  const [booster, setBooster] = useState("im");
  const [selectedRare, setSelectedRare] = useState("SSP");
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    fetchVersions();
    fetchCards();
  }, []);

  const fetchVersions = async () => {
    try {
      const response = await axios.get("http://localhost:8000/versions");
      const data = response.data;
      setVersions(data.versions);
    } catch (error) {
      console.error("Error fetching versions:", error);
    }
  };

  const fetchCards = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/search`, {
        params: {
          tcg: tcg,
          rarity: selectedRare,
          booster: booster,
        },
      });
      const data = response.data;
      setCards(data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const handleBoosterChange = (event) => {
    setBooster(event.target.value);
  };

  const handleRareSelection = (event) => {
    setSelectedRare(event.target.value);
  };

  const handleButtonClick = () => {
    fetchCards();
  };

  return (
    <div>
      <h2>바이스슈발츠 유유테이 가격과 재고 현황</h2>
      <div>
        {versions.map((version, index) => (
          <label key={index}>
            <input
              type="radio"
              value={version}
              checked={booster === version}
              onChange={handleBoosterChange}
            />
            {version}
          </label>
        ))}
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="SEC"
            checked={selectedRare === "SEC"}
            onChange={handleRareSelection}
          />
          SEC
        </label>
        <label>
          <input
            type="radio"
            value="SSP"
            checked={selectedRare === "SSP"}
            onChange={handleRareSelection}
          />
          SSP
        </label>
        <label>
          <input
            type="radio"
            value="SP"
            checked={selectedRare === "SP"}
            onChange={handleRareSelection}
          />
          SP
        </label>
        <label>
          <input
            type="radio"
            value="SR"
            checked={selectedRare === "SR"}
            onChange={handleRareSelection}
          />
          SR
        </label>
        <label>
          <input
            type="radio"
            value="RRR"
            checked={selectedRare === "RRR"}
            onChange={handleRareSelection}
          />
          RRR
        </label>
        <label>
          <input
            type="radio"
            value="RR"
            checked={selectedRare === "RR"}
            onChange={handleRareSelection}
          />
          RR
        </label>
        <label>
          <input
            type="radio"
            value="R"
            checked={selectedRare === "R"}
            onChange={handleRareSelection}
          />
          R
        </label>
        <label>
          <input
            type="radio"
            value="U"
            checked={selectedRare === "U"}
            onChange={handleRareSelection}
          />
          U
        </label>
        <label>
          <input
            type="radio"
            value="C"
            checked={selectedRare === "C"}
            onChange={handleRareSelection}
          />
          C
        </label>
      </div>
      <button onClick={handleButtonClick}>조회</button>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {cards.map((card, index) => (
          <div key={index} style={{ width: "20%", margin: "10px" }}>
            <h3>카드 이름: {card["카드 이름"]}</h3>
            <img
              src={card["이미지 URL"]}
              alt="카드 이미지"
              style={{ width: "100%" }}
            />
            <p>가격: {card["가격"]}</p>
            <p>재고: {card["재고"]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ws;
