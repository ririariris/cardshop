import React, { useEffect, useState } from "react";
import axios from "axios";

const Vg = () => {
  const [cards, setCards] = useState([]);
  const [tcg, setTcg] = useState("vg");
  const [num, setNum] = useState("1");
  const [booster, setBooster] = useState("dbt");
  const [selectedRare, setSelectedRare] = useState("FFR");

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get(`http://192.168.0.157:8000/search`, {
        params: {
          tcg: tcg,
          rarity: selectedRare,
          booster: booster,
          num: 0 + num,
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

  const handleNumChange = (event) => {
    setNum(event.target.value);
  };

  const handleRareSelection = (event) => {
    setSelectedRare(event.target.value);
  };

  const handleButtonClick = () => {
    fetchCards();
  };

  return (
    <div>
      <h2>뱅가드 유유테이 가격과 재고 현황</h2>
      <div>
        <label>
          <input
            type="radio"
            value="dbt"
            checked={booster === "dbt"}
            onChange={handleBoosterChange}
          />
          정규부스터
        </label>
        <label>
          <input
            type="radio"
            value="dtb"
            checked={booster === "dtb"}
            onChange={handleBoosterChange}
          />
          타이틀부스터
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="FFR"
            checked={selectedRare === "FFR"}
            onChange={handleRareSelection}
          />
          FFR
        </label>
        <label>
          <input
            type="radio"
            value="FR"
            checked={selectedRare === "FR"}
            onChange={handleRareSelection}
          />
          FR
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
            value="C"
            checked={selectedRare === "C"}
            onChange={handleRareSelection}
          />
          C
        </label>
      </div>
      <span>booster : </span>
      <input value={num} onChange={handleNumChange} style={{ width: "30px" }} />
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

export default Vg;
