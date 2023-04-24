import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../Api";

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    async function loadOptions(inputValue, map) {
        const response = await fetch(
            `${GEO_API_URL}cities?&namePrefix=${inputValue}`,
            geoApiOptions
        );
        const data = await response.json();
        return {
            options: data.data.map((city) => {
                return {
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                };
            }),

            hasMore: data.data.length > 0,
            additional: {
                page: 1,
            },
        };
    }

    /* .then(response => response.json())
.then(response => {
return {
    options: response.data.map((city) => {
        return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
        };
    }),
};
})
.catch(err => console.error(err));
}; */


    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    return (
        <AsyncPaginate
            className="search"
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
};

export default Search;