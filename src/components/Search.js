import { useContext, useState } from "react";
import searchIcon from "../assets/search-icon.svg";
import { CryptoContext } from "../context/CryptoContext";
import debounce from "lodash.debounce";

const SearchInput = ({ handlerSearch }) => {
  const [searchText, setSearchText] = useState("");
  let { searchData, setCoinSearch, setSearchData } = useContext(CryptoContext);

  let handleChange = (e) => {
    e.preventDefault();
    let query = e.target.value;
    setSearchText(query);
    handlerSearch(query);
    console.log(query);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlerSearch(searchText);
  };

  const selectCoin = (coin) => {
    setSearchText("");
    setCoinSearch(coin);
    setSearchData();
  };
  return (
    <>
      <form
        className="w-96 relative flex items-center
    ml-7 font-nunito
    "
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="search"
          onChange={handleChange}
          value={searchText}
          className="
      w-full rounded bg-gray-200 placeholder: text-gray-100 pl-2
      required outline-0 border border-transparent
      focus:border-cyan
      "
          placeholder="search here..."
        />
        <button type="submit" className="absolute right-1 cursor-pointer">
          <img src={searchIcon} alt="search" className="w-full h-auto" />
        </button>
      </form>

      {searchText.length > 0 ? (
        <ul
          className="absolute top-11 right-0 w-96 h-96 rounded
overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 
backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200
"
        >
          {searchData ? (
            searchData.map((coin) => {
              return (
                <li
                  className="flex items-center ml-4 my-2 cursor-pointer"
                  key={coin.id}
                  onClick={() => {
                    selectCoin(coin.id);
                  }}
                >
                  <img
                    className="w-[1.2rem] h-[1.2rem] mx-1.5"
                    src={coin.thumb}
                    alt={coin.name}
                  />
                  <span>{coin.name}</span>
                </li>
              );
            })
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <div
                className="w-8 h-8 border-4 border-cyan rounded-full
            border-b-gray-200 animate-spin
            "
                role="status"
              />
              <span className="ml-2">Searching...</span>
            </div>
          )}
        </ul>
      ) : null}
    </>
  );
};

function Search() {
  const { getSearchData } = useContext(CryptoContext);

  const debounceFunc = debounce(function (val) {
    getSearchData(val);
  }, 2000);

  return (
    <div className="relative">
      <SearchInput handlerSearch={debounceFunc} />
    </div>
  );
}

export default Search;
