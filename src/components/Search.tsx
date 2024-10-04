import { useEffect, useRef, useState } from "react";

const apiService = async (search: string, page = 1, options = {}) => {
  try {
    const result = await fetch(
      `https://swapi.dev/api/people/?search=${search}&page=${page}`,
      options
    );

    if (result.ok) {
      const data = await result.json();
      return data.results;
    }
  } catch (error) {
    return null;
  }
};

const useDebouncedValue = (value: string, ms: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, ms);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, ms]);

  return debouncedValue;
};

export const Search = () => {
  const [heroes, setHeroes] = useState([]);
  const [search, setSearch] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);

  const cachedRef = useRef(new Map());

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const debouncedSearch = useDebouncedValue(search, 300);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        setIsFetching(true);

        const result = await apiService(debouncedSearch);
        cachedRef.current.set(debouncedSearch, result);
        setHeroes(result);
        setIsFetching(false);
      } catch (error) {
        setIsFetching(false);
        setError(true);
      }
    };

    const cache = cachedRef.current.get(debouncedSearch);
    if (cache) {
      setHeroes(cache);
    } else {
      fetchHeroes();
    }
  }, [debouncedSearch]);

  if (error) {
    return <p>Something went wrong...</p>;
  }

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
        {isFetching
          ? "Data is loading..."
          : heroes.map((hero: any) => <p key={hero.name}>{hero.name}</p>)}
      </div>
    </div>
  );
};
