import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import AvatarEle from "./AvatarEle";

const SearchBar = () => {
  const [searchTxt, setSearchTxt] = useState("");
  const {
    dataState: { allUsers },
  } = useData();

  const handleSearchChange = (e) => {
    setSearchTxt(e.target.value);
  };

  // console.log(allUsers);

  const filteredUsers = allUsers.filter(({ firstName, lastName, username }) => {
    const fullName = `${firstName} ${lastName}`;

    return (
      fullName.toLowerCase().includes(searchTxt.trim().toLowerCase()) ||
      username.toLowerCase().includes(searchTxt.trim().toLowerCase())
    );
  });

  const handleClick = () => {
    setSearchTxt("");
  };

  return (
    <div className="justify-self-center ">
      {/* <h4 id="demo">Basic, Fixed List Combobox</h4> */}
      <Combobox aria-labelledby="search-bar">
        <ComboboxInput
          className="rounded-3xl border border-stone-400 px-3 py-1 font-OpenSans focus-within:border-blue-400 dark:bg-slate-100"
          placeholder="Search..."
          value={searchTxt}
          onChange={handleSearchChange}
        />
        <ComboboxPopover className="z-20 max-h-[15rem] w-[15rem] overflow-y-auto bg-gray-100 shadow-md dark:bg-gray-700">
          {filteredUsers.length > 0 ? (
            <ComboboxList>
              {filteredUsers.map((user) => (
                <ComboboxOption
                  key={user._id}
                  value={`${user.firstName} ${user.lastName}`}
                  onClick={handleClick}
                >
                  <Link to={`/profile/${user._id}`}>
                    <div
                      className="flex border-b border-b-gray-300 py-2 text-[1rem] leading-[18px] text-black dark:border-b-gray-600 dark:text-slate-50"
                      key={user._id}
                    >
                      <AvatarEle
                        imgLink={user?.pic}
                        firstName={user?.firstName}
                        lastName={user?.lastName}
                      />

                      <div className="item flex flex-col justify-center gap-1">
                        <span>{user?.firstName + " " + user?.lastName}</span>
                        <span className="text-[small]">{`@${user.username}`}</span>
                      </div>
                    </div>
                  </Link>
                </ComboboxOption>
              ))}
            </ComboboxList>
          ) : (
            <span className="m-[8px] block">No results found</span>
          )}
          {/* <ComboboxOption value="Apple">
              🍎 <ComboboxOptionText />
            </ComboboxOption>
            <ComboboxOption value="Banana" />
            <ComboboxOption value="Orange" />
            <ComboboxOption value="Pineapple" />
            <ComboboxOption value="Kiwi" /> */}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default SearchBar;
