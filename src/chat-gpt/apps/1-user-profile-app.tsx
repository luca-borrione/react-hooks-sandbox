import {
  createContext,
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

type UserContextType = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
};

const UserContext = createContext<UserContextType | null>(null);

function UserProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState('Luca');
  const value = useMemo(() => ({ name, setName }), [name]);
  return <UserContext value={value}>{children}</UserContext>;
}

function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used inside UserProvider');
  }

  return context;
}

function Profile() {
  const { name } = useUser();
  return <p>Hello {name}</p>;
}

function Form() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { name, setName } = useUser();
  const handleSubmit: MouseEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!inputRef.current) {
      return;
    }
    const currentName = inputRef.current.value;
    if (currentName && currentName !== name) {
      setName(currentName);
    }
    inputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} type="text" placeholder={name} />
      <button type="submit">Update</button>
    </form>
  );
}

export function UserProfile() {
  return (
    <UserProvider>
      <Profile />
      <Form />
    </UserProvider>
  );
}
