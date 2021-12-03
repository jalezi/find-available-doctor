import { useEffect, useState } from 'react';
import { readRemoteFile } from 'react-papaparse';

const useFetchAndParseCsv = url => {
  const [parsed, setParsed] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCsv = async () => {
      setIsFetching(true);
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        readRemoteFile(blob, {
          complete: results => {
            const { data, errors } = results;
            if (errors.length > 0) {
              console.log(errors);
              setError(new Error('Somenthing went wrong during parsing csv file!'));
            }

            if (!data) {
              setError(new Error('No data in csv file!'));
            }

            if (data) setParsed(data);
          },
        });
      } catch (err) {
        setError(err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchCsv();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { parsed, isFetching, error };
};

export default useFetchAndParseCsv;
