import React, { useEffect, useState } from "react";
import "./quran.css";

function Chapters() {
  const [chapters, setChapters] = useState(null);

  useEffect(() => {
    const fetchQuranChapters = async () => {
      try {
        const response = await fetch("https://api.quran.com/api/v4/chapters", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setChapters(data.chapters); // Assuming chapters are within 'data' object
          console.log(data)
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching Quran chapters:", error);
      }
    };

    fetchQuranChapters();
  }, []);

  return (
    <div className="quran">
      <div className="heightContain">
        <div className="chapters">
          <div className="titleC">
            <h3>SURAH</h3>
          </div>
          <div className="scrollable">
            {Array.isArray(chapters) ? (
              chapters.map((item) => (
                <button key={item.id} className="chapter">
                  <h4>{item.id}</h4>
                  <h4>{item.name_simple}</h4>
                </button>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
      <div className="displayQ">
      asdas
      </div>
    </div>
  );
}

export default Chapters;
