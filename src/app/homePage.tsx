import React, {FC} from 'react';
import CalendarTable from "../features/CalendarTable/calendarTable";
import {FilterEnum} from "../features/tableFilters/filters";
import BasicEntity from "../features/basicEntity/basicEntity";
import MenuBar from "../features/MenuBar/menuBar";

interface HomePageProps {
    setSearchFilter: React.Dispatch<React.SetStateAction<string>>,
    searchFilter: string,
    setFilter: React.Dispatch<React.SetStateAction<FilterEnum>>,
    filter: FilterEnum,
    setEditItem: React.Dispatch<React.SetStateAction<BasicEntity | undefined>>,
}

const HomePage: FC<HomePageProps> = ({setSearchFilter, searchFilter, setFilter, filter, setEditItem}) => {
    return (<>
        <MenuBar setSearchFilter={setSearchFilter} setFilter={setFilter} filter={filter}/>
        <CalendarTable searchFilter={searchFilter} filter={filter}
                       setEditItem={setEditItem}/>
    </>);
}

export default HomePage;