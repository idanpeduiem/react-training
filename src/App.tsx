import React, {useState} from 'react';
import './App.css';
import {Card, Grid, makeStyles, Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core";
import {FilterEnum} from './features/tableFilters/filters';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AddForm from "./features/editForm/addForm";
import EditForm from "./features/editForm/editForm";
import BasicEntity from "./features/basicEntity/basicEntity";
import HomePage from "./app/homePage";

export type gridItemType = boolean | "auto" | 2 | 1 | 6 | 3 | 4 | 5 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;

function App() {
    const classes = useStyles();
    const [filter, setFilter] = useState<FilterEnum>(FilterEnum.NO_FILTER);
    const [searchFilter, setSearchFilter] = useState("");
    const [editItem, setEditItem] = useState<BasicEntity>();
    const [cardSize, setCardSize] = useState<gridItemType>(12);
    return (
            <Grid className={classes.gridContainer} xs={cardSize}>
                <Card className={classes.card}>
                    <Router>
                        <div>
                            <Switch>
                                <Route path="/add">
                                    <AddForm setCardSize={setCardSize}/>
                                </Route>
                                <Route path="/edit">
                                    <EditForm item={editItem} setCardSize={setCardSize}/>
                                </Route>
                                <Route path="/">
                                    <HomePage searchFilter={searchFilter} filter={filter}
                                              setEditItem={setEditItem} setFilter={setFilter}
                                              setSearchFilter={setSearchFilter}/>
                                </Route>
                            </Switch>
                        </div>
                    </Router>
                </Card>
            </Grid>
    );
}

export default App;

const useStyles = makeStyles({
    card: {
        backgroundColor: "#9ce1ff"
    },
    gridContainer: {
        justifyContent: "center",
        padding: "50px 80px",

    }
});
