import React, { useCallback, useEffect, useState } from "react";

const debounce = (cb: (args: any) => void, delay: number) => {
  let timerId: NodeJS.Timeout | null = null;

  return (...args: any) => {
    clearTimeout(timerId as NodeJS.Timeout);
    timerId = setTimeout(() => {
      timerId = null;
      cb(args);
    }, delay);
  };
};

const apiService = async (search: string, page = 1, options = {}) => {
  try {
    const res = await fetch(
      `https://swapi.dev/api/people/?search=${search}&page=${page}`,
      options
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    return null;
  }
};

const useFetching = (search: string) => {
  const [isFetching, setIsFetching] = useState(false);
  const [result, setResult] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsFetching(true);
      const data = await apiService(search);
      if (data) {
        setResult(data);
        setIsFetching(false);
      }
    } catch (error) {
      setError(error as string);
      setIsFetching(false);
    }
  };

  const debouncedFetch = debounce(fetchData, 300);
  const debouncedValue = useCallback(debouncedFetch, [debouncedFetch]);

  useEffect(() => {
    if (search) {
      debouncedValue(search);
    }
  }, [search, debouncedValue]);

  return { result, isFetching, error };
};

export const NewSearch = () => {
  const [search, setSearh] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearh(e.target.value);
  };

  const { result, error, isFetching } = useFetching(search);

  return (
    <div
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        marginTop: "4rem",
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
          value={search}
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
        {isFetching ? (
          <p>...Data is fetching</p>
        ) : result ? (
          result.map((item: any) => <p key={item.name}>{item.name}</p>)
        ) : null}
        {error && <p>Something went wrong</p>}
      </div>
    </div>
  );
};
