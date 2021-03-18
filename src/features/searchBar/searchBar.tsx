import React, {FC} from 'react';
import {InputAdornment, makeStyles, TextField} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

interface SearchBarProps {
    setSearchFilter: React.Dispatch<React.SetStateAction<string>>,
}

const SearchBar: FC<SearchBarProps> = ({setSearchFilter}) => {
    const classes = useStyles();
    const updateSearchFilter = (event: any) => {
        setSearchFilter(event.target.value.toLowerCase());
    };
    return (
        <TextField placeholder="search" onChange={updateSearchFilter} variant="outlined" className={classes.searchField}
                   InputProps={{
                       startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>
                   }}/>
    );
}

export default SearchBar;

const useStyles = makeStyles({
    searchField: {
        padding: "15px"
    },
});