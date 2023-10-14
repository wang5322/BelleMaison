import React, {useState} from 'react';
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
//import CloseIcon from '@mui/icons-material/Close';


function SearchBar({placeholder, data}){
    const [filteredData, setFilteredData] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event)=>{
        const search = event.target.value;
        const newFilter = data.filter((value)=>{
            return value.city.toLowerCase().includes(search.toLowerCase());
        });
        if(search === ""){
            setFilteredData([]);
        }else{
            setFilteredData(newFilter);
        }
    }

    const clearInput = ()=>{
        setFilteredData([]);
        setWordEntered("");
        setInputValue("");
    }

    const setSearchCity = (value)=>{
        //setInputValue(value);
        //alert(value);
        document.getElementById("searchInput").value = value;
        clearInput();
    }

    return (
        <div className='search'>
            <div className='searchInputs'>
                <input id="searchInput" type='text' placeholder={placeholder} onChange={handleFilter}></input>
                <div className='searchIcon'>

                        {/* <SearchIcon onClick={doSearch()} /> */}

                </div>
            </div>
            {filteredData.length !== 0 &&
                <div className='dataResult'>
                    {filteredData.map((value, key)=>{
                        return <a onClick={()=>{setSearchCity(value.city)}} className='dataItem' >{value.city}</a>
                    })}
                </div>
            }
        </div>
    )
}

export default SearchBar;