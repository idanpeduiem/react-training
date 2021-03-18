import React, {FC} from 'react';
import {FilterEnum} from "../tableFilters/filters";
import {
    AppBar,
    Fab,
    Grid,
    makeStyles,
    Menu,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableRow, Toolbar,
    Typography
} from "@material-ui/core";
import SearchBar from "../searchBar/searchBar";
import FilterBar from "../tableFilters/filterBar";
import {Link} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";

interface MenuBarProps {
    setSearchFilter: React.Dispatch<React.SetStateAction<string>>,
    filter: FilterEnum,
    setFilter: React.Dispatch<React.SetStateAction<FilterEnum>>
}

const MenuBar: FC<MenuBarProps> = ({setSearchFilter, filter, setFilter}) => {
    const classes = useStyles();
    return (
            <Toolbar>
                <Typography className={classes.title}>Blue Calendar</Typography>
                <div className={classes.searchBar}>
                    <SearchBar setSearchFilter={setSearchFilter}/>
                </div>
                <div className={classes.filterBar}>
                    <FilterBar setFilter={setFilter} filter={filter}/>
                </div>
                <div className={classes.space}></div>
                <div className={classes.addButton}>
                    <Link to="/add"><Fab><AddIcon/></Fab></Link>
                </div>
            </Toolbar>
        );
};

const useStyles = makeStyles({
    title: {
        fontSize: "34px",
        textAlign: "center",
        fontWeight: "bold",
        margin: "10px",
        width: "20%"
    },
    searchBar: {
        margin: "10px",
        width: "20%"
    },
    filterBar: {
        margin: "10px",
        width: "60%"
    },
    addButton: {
        margin: "20px"
    },
    space: {
        width: "21%"
    }
})

export default MenuBar;