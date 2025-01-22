import { FC, useEffect, useState } from "react";

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface IListItem {
  id: number;
  username: string;
  email: string;
}

const USER_URL = "https://jsonplaceholder.typicode.com/users";

const apiService = async (url: string, options = {}) => {
  try {
    const result = await fetch(url, options);

    if (result.ok) {
      const data = await result.json();
      return data;
    }
  } catch (error) {
    throw new Error("something went wrong");
  }
};

const ListItem: FC<IListItem> = (item) => {
  return (
    <li
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid grey",
        gap: "5px",
        padding: "5px",
      }}
    >
      <p>Username: {item.username}</p>
      <p>Useremail: {item.email}</p>
    </li>
  );
};

const useFetching = (url: string, options = {}) => {
  const [result, setResult] = useState<IUser[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsFetching(true);

        const data = await apiService(url, options);
        setResult(data);
        setIsFetching(false);
      } catch (error) {
        setError(error as string);
        setIsFetching(false);
      }
    };

    fetchUsers();
  }, [url, options]);

  return { result, isFetching, error };
};

export const List = () => {
  const { result: users, error, isFetching } = useFetching(USER_URL);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        width: "300px",
        gap: "5px",
      }}
    >
      <h3 style={{ textAlign: "center" }}>User List</h3>
      {isFetching && <p>Data is fetching...</p>}
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          width: "300px",
          gap: "5px",
        }}
      >
        {users.map(({ id, username, email }) => (
          <ListItem id={id} username={username} email={email} key={id} />
        ))}
      </ul>
    </div>
  );
};
