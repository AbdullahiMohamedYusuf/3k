import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UniquePrayerTimesRow.css";

const UniquePrayerTimesRow = () => {
  const [fajrToIshaTimes, setFajrToIshaTimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const localDate = new Date();
        const year = localDate.getFullYear();
        const month = localDate.getMonth() + 1;
        const day = localDate.getDate();
        const city = "Stockholm"; // Replace with your desired city
        const country = "Sweden"; // Replace with your desired country

        const response = await axios.get(
          `http://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${city}&country=${country}`
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

    fetchPrayerTimes();
  }, []);

  return (
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
  );
};

export default UniquePrayerTimesRow;
