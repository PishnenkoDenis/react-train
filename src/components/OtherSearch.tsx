import { useCallback, useEffect, useRef, useState } from "react";

const apiService = (search: string, page = 1, options = {}) => {
  return fetch(
    `https://swapi.dev/api/people/?search=${search}&page=${page}`,
    options
  )
    .then((res) => res.json())
    .then((data) => data);
};

const debounce = (cb: (args: any) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: any) => {
    clearTimeout(timeoutId as NodeJS.Timeout);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      cb(args);
    }, delay);
  };
};

export const OtherSearch = () => {
  const [heroes, setHeroes] = useState([]);
  const [search, setSearch] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIsFetching(true);
  };

  const fetchPeople = async () => {
    try {
      const data = await apiService(search);
      setHeroes(data.results);
      setIsFetching(false);
    } catch (error) {
      setIsError(true);
      setIsFetching(false);
    }
  };

  const debouncedFetch = debounce(fetchPeople, 500);
  const debouncedCb = useCallback(debouncedFetch, []);

  useEffect(() => {
    if (!search) {
      setHeroes([]);
      setIsFetching(false);
    } else {
      //   apiService(search)
      //     .then((data) => {
      //       setHeroes(data.results);
      //       setIsFetching(false);
      //     })
      //     .catch((err) => {
      //       setIsError(true);
      //       setIsFetching(false);
      //     });
      debouncedCb(search);
    }
  }, [debouncedCb, search]);

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
          : search &&
            heroes.map((hero: any) => <p key={hero.name}>{hero.name}</p>)}
        {isError && "Something went wrong"}
      </div>
    </div>
  );
};
