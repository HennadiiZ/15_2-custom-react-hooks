import { useState, useCallback } from 'react';

// const useHttp = (requestConfig, applyData) => {
const useHttp = (applyData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
        // 'https://react-http-38022-default-rtdb.firebaseio.com/tasks.json'
        
        // requestConfig.url, {
        //   method: requestConfig.method,
        //   headers: requestConfig.headers,
        //   body: JSON.stringify(requestConfig.body)
        // }

        requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.headers : {} ,
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      applyData(data);
      //   const loadedTasks = [];
      //   for (const taskKey in data) {
      //     loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      //   }
      //   setTasks(loadedTasks);

      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    }, [applyData]);

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest
  };
}

export default useHttp;