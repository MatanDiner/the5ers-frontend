import React, { useMemo, useEffect } from "react";
import { FormControl, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@material-ui/icons/Search";
import debouce from "lodash.debounce";
import { inject, observer } from 'mobx-react';

const Search = inject('stockStore')(
    observer((props: any) => {
        const { stockStore } = props;

        const handleChange = (e: any) => {

            stockStore.setSearchText(e.target.value)
        };

        const debouncedResults = useMemo(() => {
            return debouce(handleChange, 300);
        }, []);

        useEffect(() => {
            return () => {
                debouncedResults.cancel();
            };
        });

        return (
            <div id="app">
                <FormControl className={"search"}>
                    <TextField
                        size="small"
                        variant="outlined"
                        onChange={debouncedResults}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                </FormControl>
            </div>
        );
    }),
);

export default Search;