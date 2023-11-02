// PrayerTimes.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./table.css";

const PrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const localDate = new Date();
  const month = localDate.getMonth() + 1;
  const year = localDate.getFullYear();
  const currentDay = localDate.getDate();
  const rowsPerPage = Math.ceil(prayerTimes.length / 3);
  const [sectionIndex, setSectionIndex] = useState(0);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await axios.get(
          `http://api.aladhan.com/v1/calendar/${year}/${month}?latitude=59.325&longitude=18.05`
        );
        setPrayerTimes(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPrayerTimes();
  }, [year, month]);

  const showMoreRows = () => {
    setSectionIndex((prevSectionIndex) => (prevSectionIndex + 1) % 3);
  };

  const isCurrentDay = (day) => day === currentDay;

  const visiblePrayerTimes = prayerTimes.slice(
    sectionIndex * rowsPerPage,
    (sectionIndex + 1) * rowsPerPage
  );

  return (
    <div className="center-table">
      <br />
      <br />
      <div className="boxBehind">
        {loading ? (
          <p>Loading prayer times...</p>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Fajr</th>
                  <th>Dhuhr</th>
                  <th>Asr</th>
                  <th>Maghrib</th>
                  <th>Isha</th>
                </tr>
              </thead>
              <tbody>
                {visiblePrayerTimes.map((day) => (
                  <tr
                    key={day.date.gregorian.date}
                    className={
                      isCurrentDay(day.date.gregorian.day) ? "current-day" : ""
                    }
                  >
                    <td className="checker">{day.date.gregorian.date}</td>
                    <td className="checker">{day.timings.Fajr}</td>
                    <td className="checker">{day.timings.Dhuhr}</td>
                    <td className="checker">{day.timings.Asr}</td>
                    <td className="checker">{day.timings.Maghrib}</td>
                    <td className="checker">{day.timings.Isha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="buttons">
        <button onClick={showMoreRows}>
          <i class="fa-solid fa-arrow-down"></i>
        </button>
      </div>
    </div>
  );
};

export default PrayerTimes;
