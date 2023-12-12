import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UniquePrayerTimesRow.css";

const UniquePrayerTimesRow = () => {
  const [fajrToIshaTimes, setFajrToIshaTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Stockholm"); // State to manage the city

  const fetchPrayerTimes = async (selectedCity) => {
    try {
      const localDate = new Date();
      const year = localDate.getFullYear();
      const month = localDate.getMonth() + 1;
      const day = localDate.getDate();
      const country = "Sweden"; // Replace with your desired country

      const response = await axios.get(
        `http://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${selectedCity}&country=${country}`
      );

      const todayPrayerTimes = response.data.data[day - 1].timings;
      const fajrToIshaTimes = {
        Fajr: todayPrayerTimes.Fajr,
        Dhuhr: todayPrayerTimes.Dhuhr,
        Asr: todayPrayerTimes.Asr,
        Maghrib: todayPrayerTimes.Maghrib,
        Isha: todayPrayerTimes.Isha,
      };

      setFajrToIshaTimes(fajrToIshaTimes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPrayerTimes(city);
  }, [city]); // Fetch prayer times whenever 'city' changes

  return (
    <div className="column-time">
      <div className="cities">
        <button onClick={() => setCity("Stockholm")}>STOCKHOLM</button>
        <button onClick={() => setCity("Malmö")}>MALMÖ</button>
        <button onClick={() => setCity("Göteborg")}>GÖTEBORG</button>
        <button onClick={() => setCity("Uppsala")}>UPPSALA</button>
        <input type="text" placeholder="Sök efter stad här" onKeyDown={(e) => e.key == 'Enter' && setCity(e.target.value)} />
      </div>
      <div className="unique-prayer-times-row">
        {loading ? (
          <p>Loading prayer times...</p>
        ) : (
          <>
            {Object.keys(fajrToIshaTimes).map((prayer) => (
              <div key={prayer} className="prayer-time">
                <p>
                  <strong>{prayer}</strong>
                </p>
                <p>{fajrToIshaTimes[prayer]}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default UniquePrayerTimesRow;
