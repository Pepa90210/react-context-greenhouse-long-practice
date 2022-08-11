import { createContext, useContext, useState, useEffect } from 'react';

export const ClimateContext = createContext();

export const useClimate = () => useContext(ClimateContext);

export default function ClimateProvider({ children }) {
    const [temperature, setTemperature] = useState(50);
    const [humidity, setHumidity] = useState(40);
    const [desiredTemp, setDesiredTemp] = useState(50);
    const [desiredHumidity, setDesiredHumidity] = useState(40);


    useEffect(() => {
      const tempTimeout = setTimeout(() => {
        if (desiredTemp > temperature) {
          return setTemperature((prev) => ++prev)
        } else if (desiredTemp < temperature) {
          return setTemperature((prev) => --prev)
        }
      }, 1000)
      return () => clearTimeout(tempTimeout)
    }, [desiredTemp, temperature])

    useEffect(() => {
      const humidityTimeout = setTimeout(() => {
        if (desiredHumidity > humidity) {
          return setHumidity((prev) => ++prev)
        } else if (desiredHumidity < humidity) {
          return setHumidity((prev) => --prev)
        }
      }, 500)
      return () => clearTimeout(humidityTimeout)
    }, [desiredHumidity, humidity])

    return (
      <ClimateContext.Provider
        value={{
          temperature,
          setTemperature,
          humidity,
          setHumidity,
          desiredTemp,
          setDesiredTemp,
          desiredHumidity,
          setDesiredHumidity
        }}
      >
        {children}
      </ClimateContext.Provider>
    );
  }
// Temperature has a default value of 50 degrees
// Humidity has a default value of 40%
