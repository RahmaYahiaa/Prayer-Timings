import React, { useEffect, useState } from 'react';
import Prayer from './components/Prayer';
/* eslint-disable */ 
function App() {

  const [prayerTimes, setPrayerTimes] = useState({});
  const [dateTime, setDateTime] = useState('');
  const [city, setCity] = useState("Cairo");

  const cities = [
    { name: "القاهرة", value: "Cairo" },
    { name: "الإسكندرية", value: "Alexandria" },
    { name: "الجيزة", value: "Giza" },
    { name: "المنصورة", value: "Mansoura" },
    { name: "أسوان", value: "Aswan" },
    { name: "الأقصر", value: "Luxor" },
    { name: "المنوفية", value: "Monufia" },
    { name: "الإسماعيلية", value: "Ismailia" },
    { name: "السويس", value: "Suez" },
    { name: "دمياط", value: "Damietta" },
    { name: "الفيوم", value: "Fayoum" },
    { name: "بني سويف", value: "Beni Suef" },
    { name: "المنيا", value: "Minya" },
    { name: "أسيوط", value: "Assiut" },
    { name: "سوهاج", value: "Sohag" },
    { name: "قنا", value: "Qena" },
    { name: "البحر الأحمر", value: "Red Sea" },
    { name: "مرسى مطروح", value: "Matruh" },
    { name: "شمال سيناء", value: "North Sinai" },
    { name: "جنوب سيناء", value: "South Sinai" },
    { name: "الشرقية", value: "Sharqia" },
    { name: "الغربية", value: "Gharbia" },
    { name: "الدقهلية", value: "Dakahlia" },
    { name: "كفر الشيخ", value: "Kafr El-Sheikh" },
    { name: "السويس", value: "Suez" }
  ];

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); 
      const day = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=${city}&country=EG`);
        const data_Prayer = await response.json();
        setPrayerTimes(data_Prayer.data.timings);
        setDateTime(data_Prayer.data.date.gregorian.date);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchPrayerTimes();
  }, [city]); 
  const formatTimes = (time) => {
    if (!time) {
      return "00:00";
    }
    let [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
  };

  return (
    <section>
      <div className="container">
        <div className="top_sec">
          <div className="city">
            <h3>المدينة</h3>
            <select name="" id="" onChange={(e) => setCity(e.target.value)}>
              {cities.map((city_Obj) => (
                <option key={city_Obj.value} value={city_Obj.value}>
                  {city_Obj.name}
                </option>
              ))}
            </select>
          </div>
          <div className="date">
            <h3>التاريخ</h3>
            <h4>{dateTime}</h4>
          </div>
        </div>
        <div className="bottom_sec">
          <Prayer name="الفجر" time={formatTimes(prayerTimes.Fajr)} />
          <Prayer name="الظهر" time={formatTimes(prayerTimes.Dhuhr)} />
          <Prayer name="العصر" time={formatTimes(prayerTimes.Asr)} />
          <Prayer name="المغرب" time={formatTimes(prayerTimes.Maghrib)} />
          <Prayer name="العشاء" time={formatTimes(prayerTimes.Isha)} />
        </div>
      </div>
    </section>
  );
}

export default App