import { useCallback, useEffect, useRef, useState } from "react";

const apiService = async (search: string, page = 1, options = {}) => {
  try {
    const res = await fetch(
      `https://swapi.dev/api/people/?search=${search}&page=${page}`
    );

    if (res.ok) {
      const data = await res.json();
      return data.results;
    }
  } catch (error) {
    return null;
  }
};

const debounce = (cb: (args: any) => void, delay: number) => {
  let timerId: NodeJS.Timeout | null = null;

  return (...args: any) => {
    clearTimeout(timerId as NodeJS.Timeout);
    setTimeout(() => {
      timerId = null;
      cb(args);
    }, delay);
  };
};

const useFetching = (value: string) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  const cacheRef = useRef(new Map());

  const fetchData = async (val: string) => {
    try {
      setIsFetching(true);

      const result = await apiService(val);
      cacheRef.current.set(val, result);
      setData(result);
      setIsFetching(false);
    } catch (error) {
      setIsError(true);
      setIsFetching(false);
    }
  };

  const debouncedFetch = debounce(fetchData, 500);

  const fetchResult = useCallback(debouncedFetch, []);

  useEffect(() => {
    if (!value) {
      setData([]);
      setIsFetching(false);
    } else {
      const cache = cacheRef.current.get(value);
      cache ? setData(cache) : fetchResult(value);
    }
  }, [fetchResult, value]);

  return {
    isFetching,
    isError,
    data,
  };
};

export const MySearch = () => {
  const [value, setValue] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const { isError, isFetching, data } = useFetching(value);

  return (
    <div
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        marginTop: "2rem",
        margin: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "350px",
          justifyContent: "space-around",
          marginTop: "2rem",
          margin: "auto",
        }}
      >
        <input
          type="search"
          value={value}
          placeholder="search heroes..."
          onChange={handleSearch}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "350px",
          flexDirection: "column",
          marginTop: "2rem",
          margin: "auto",
        }}
      >
        {isFetching
          ? "Data is loading..."
          : value &&
            data.map((hero: any) => <p key={hero.name}>{hero.name}</p>)}
        {isError && "Something went wrong"}
      </div>
    </div>
  );
};
