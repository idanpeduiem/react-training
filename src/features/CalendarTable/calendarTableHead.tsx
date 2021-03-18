import React, {FC} from 'react';
import {makeStyles, TableCell, TableHead, TableRow} from "@material-ui/core";

interface CalendarTableHeadProps {
    head: string[],
}

const CalendarTableHead: FC<CalendarTableHeadProps> = ({head}) => {
    const classes = useStyles();
    return (
        <TableHead>
            <TableRow>
                {head.map((category: string) => {
                        if(category === 'Other') {
                            return (<TableCell key={category} align="center" className={classes.boldBorderTableCell}>{category}</TableCell>);
                        }
                        return (<TableCell key={category} align="center" className={classes.bold}>{category}</TableCell>
                        );
                    }
                )}
            </TableRow>
        </TableHead>
    );
};

export default CalendarTableHead;

const useStyles = makeStyles({
    bold: {
        fontWeight: 'bold',
    },
    boldBorderTableCell: {
        fontWeight: 'bold',
        borderRight: "1px solid lightGrey",
        borderLeft: "1px solid lightGrey"
    }
});