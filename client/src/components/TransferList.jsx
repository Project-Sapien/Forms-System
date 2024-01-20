import * as React from 'react';

import { Button, Card, CardHeader, Checkbox, Divider, List, ListItemButton, ListItemIcon, ListItemText, Grid, TextField } from '@mui/material';

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

export default function TransferList({ labels = Array.from({ length: 8 }, (_, id) => ({ text: `Question List ${id}`, id })), chosen = [0, 1, 2, 3] }) {

    //chosen should be a set of IDs for the questions included in  the region. For now I will just assume  everything is indexed 0 to len(labels)   
    //have not yet linked right side to chosen
    const map = labels.reduce((acc, obj) => {
        acc.set(obj.id, obj.text);
        return acc;
    }, new Map());

    const [searchLeft, setSearchLeft] = React.useState('');
    const [searchRight, setSearchRight] = React.useState('');

    const [checked, setChecked] = React.useState([]);


    const [left, setLeft] = React.useState(labels.map(obj => obj.id).filter(id => !chosen.includes(id)));
    const [right, setRight] = React.useState(chosen);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const updateDatabase = () => {
        //Ensure that 'chosen' is changed to right and make the change in the database
    }

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const customList = (title, items, filter, setter ) => (
        <Card>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={
                            numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{
                            'aria-label': 'all items selected',
                        }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <TextField
                sx={{ m: 1 }}
               
                placeholder="Search..."
                value={filter}
                onChange={(event) => setter(event.target.value)}
            />
            <Divider />
            <List
                sx={{
                    width: 200,
                    height: 230,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {items.filter((id) => (map.get(id).startsWith(filter))).map((value) => {
                    const labelId = `transfer-list-all-item-${value}-label`;

                    return (
                        <ListItemButton
                            key={value}
                            role="listitem"
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={map.get(value)} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Card>
    );

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>{customList('Not in Form', left,  searchLeft,  setSearchLeft)}</Grid> 
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList('In Form', right, searchRight, setSearchRight)}</Grid>

            
            <Grid item xs={12} container justifyContent="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={updateDatabase}
                >
                    Confirm
                </Button>
            </Grid>
        </Grid>
    );

}