import { useEffect, useState, useMemo } from "react";
import Navigation from "../components/navigation";
import { getRandomNumber } from "../utils/randomNumber";

export default function PageTwo() {
  const [name, setName] = useState<string>("");
  const [count, setCount] = useState<number>(-1);
  const nameArrayObj = [
    { name: "mario", surname: "d'errico" },
    { name: "michele", surname: "simeone" },
    { name: "giovanni", surname: "bianchi" },
  ];

  useEffect(() => {
    if (name === "") {
      setName("randomic message " + getRandomNumber(0, 10).toString());
    }
    setCount((prevCount) => prevCount + 1);
  }, [name]);

  //this use memo hook add upper case to nameArrayObj
  const upperCaseNames = useMemo(() => {
    return nameArrayObj.map((person) => ({
      ...person,
      name: person.name.toUpperCase(),
    }));
  }, [nameArrayObj]);

  return (
    <>
      <Navigation />
      <p>This is a page for hook showcase</p>
      <p>The name of hook is {name}</p>
      <p>Changed this props {count} times</p>
      {upperCaseNames.map((value, index) => (
        <h1
          key={index}
          onClick={() => {
            setName(value.name + index);
          }}
        >
          {value.name} {value.surname}
        </h1>
      ))}
    </>
  );
}
