import {
  FC,
  PropsWithChildren,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";

interface IButtnProps {
  onClick: () => void;
}

interface IInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

interface IMessage {
  text: string;
  id: number;
  likes: number | null;
}

interface IMessageProps extends IMessage {
  onClick: (id: number) => void;
}

const Button: FC<PropsWithChildren<IButtnProps>> = memo(
  ({ onClick, children }) => {
    console.log("button");
    return <button onClick={onClick}>{children}</button>;
  }
);

const Input: FC<IInputProps> = memo(({ onChange, value }) => {
  return <input type="text" value={value} onChange={onChange} />;
});

const Message: FC<PropsWithChildren<IMessageProps>> = memo(
  ({ text, id, likes, onClick }) => {
    console.log("message");
    return (
      <li
        style={{
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px",
          border: "1px solid black",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <p>{text}</p>
          <p>Count: {likes}</p>
        </div>
        <Button onClick={() => onClick(id)}>Like</Button>
      </li>
    );
  }
);

const useDebounced = (value: string, ms: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), ms);

    return () => {
      clearTimeout(timerId);
    };
  }, [ms, value]);

  return debouncedValue;
};

export const Likes = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState("");
  const [likesCount, setLikesCount] = useState<number | null>(null);

  const handleMessage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(e.target.value);
    },
    [setMessage]
  );

  const debouncedMessage = useDebounced(message, 1000);

  const handleSend = useCallback(() => {
    const newMsg: IMessage = {
      text: debouncedMessage,
      id: Date.now(),
      likes: null,
    };
    setMessages((prev) => [...prev, newMsg]);
    setMessage("");
  }, [debouncedMessage]);

  const handleLike = useCallback((id?: number) => {
    setMessages((prev) =>
      [...prev].map((item) => {
        if (item.id === id) {
          if (!item.likes) {
            return {
              ...item,
              likes: 1,
            };
          } else {
            return {
              ...item,
              likes: item.likes + 1,
            };
          }
        }
        return item;
      })
    );
  }, []);

  useEffect(() => {
    const count = messages.reduce((acc, item) => {
      return item.likes ? acc + item.likes : acc;
    }, 0);

    setLikesCount(count);
  }, [messages]);

  return (
    <div
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginTop: "2rem",
        margin: "auto",
      }}
    >
      <h3>Likes: {likesCount ? likesCount : null}</h3>
      <ul style={{ width: "100%", padding: 0 }}>
        {messages.length
          ? messages.map(({ text, id, likes }) => (
              <Message
                key={id}
                text={text}
                likes={likes}
                id={id}
                onClick={handleLike}
              />
            ))
          : null}

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "auto",
          }}
        >
          <Input value={message} onChange={handleMessage} />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </ul>
    </div>
  );
};
