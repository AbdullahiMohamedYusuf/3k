import React, { useState, useEffect } from "react";
import axios from "axios";

function Verses() {
  const [verses, setVerses] = useState([]);
  const [totalAyah, setTotalAyah] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const surahNo = 1; // Replace with the desired Surah number
        const response = await axios.get(
          `https://quranapi.pages.dev/api/${surahNo}/1.json`
        );

        console.log(response.data); // Log the response to inspect its structure

        if (response.data && response.data.totalAyah) {
          setTotalAyah(response.data.totalAyah);
        } else {
          console.error("Invalid response structure. Total Ayah not found.");
        }
      } catch (error) {
        console.error("Error fetching total Ayah:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchVerses = async () => {
      try {
        const surahNo = 1; // Replace with the desired Surah number

        // Fetch each verse and concatenate them
        const versesArray = [];
        for (let ayahNo = 1; ayahNo <= totalAyah; ayahNo++) {
          const verseResponse = await axios.get(
            `https://quranapi.pages.dev/api/${surahNo}/${ayahNo}.json`
          );

          if (verseResponse.data && verseResponse.data.arabic1) {
            versesArray.push(verseResponse.data.arabic1);
          }
        }

        setVerses(versesArray);
      } catch (error) {
        console.error("Error fetching verses:", error);
      }
    };

    if (totalAyah > 0) {
      fetchVerses();
    }
  }, [totalAyah]);

  return (
    <div>
      <h1>Quran Verses</h1>
      <div>
        {verses.map((verse, index) => (
          <p key={index}>Verse {index + 1}: {verse}</p>
        ))}
      </div>
    </div>
  );
}

export default Verses;
