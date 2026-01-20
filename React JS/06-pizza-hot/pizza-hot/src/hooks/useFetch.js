// We are importing React hooks
import { useCallback, useEffect, useState } from "react";
// Custom fetch hook
export default function useFetch(url, config, initialData) {
  const [data, setData] = useState(initialData); // Holds data received from the server
  const [error, SetError] = useState(null); // Holds the error message
  const [isLoading, setIsLoading] = useState(false);  // Holds the loading status (for spinners, etc.)

  // Function that sends the API request
  // useCallback: prevents unnecessary re-creation
  const SendRequest = useCallback(
    async function SendRequest(data) {
      setIsLoading(true); // Loading is set to true when the request starts
      SetError(null); // Clears previous errors

      try {
        // A fetch request is sent
        // // If a body exists (POST, PUT), it is added as data
        const response = await fetch(url, { ...config, body: data });
        // The incoming response is converted to JSON
        const resData = await response.json();

        // An error will be thrown if HTTP status is not 200-299
        if (!response.ok) {
          throw new Error(resData.message || "hata oluştu");
        }

        // If successful, the incoming data is written to the state.
        setData(resData);

      } catch (error) {
        // If an error occurs, the error message is written to the state.
        SetError(error.message);
      }

      // Loading will be set to false after the request is complete.
      setIsLoading(false);
    },
    // The function is recreated if the URL or configuration changes.
    [url, config]
  );

  // This runs when the component is first rendered or when dependencies change
  useEffect(() => {
    // If the method is GET, an automatic request is sent.
    if (config && config.method === "GET") {
      SendRequest();
    }
  }, [SendRequest, config]);

  // The hook returns these values.
  return {
    data, // Incoming data
    isLoading, // Loading status
    error, // Error message
    SendRequest, // Function for submitting a manual request
  };
}