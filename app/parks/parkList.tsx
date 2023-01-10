// 'use client';
import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import Link from 'next/link';
import { Park } from '../../typings';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { AnyRecord } from 'dns';
import { useSession, signIn, signOut } from 'next-auth/react';
import Button from '@mui/material/Button';

// const testFetch = await fetch('https://www.boredapi.com/api/activity');
// console.log('testFetch=======>', testFetch);

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(order: Order, orderBy: Key): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'park_name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'state',
    numeric: true,
    disablePadding: false,
    label: 'States',
  },
  {
    id: 'park_code',
    numeric: true,
    disablePadding: false,
    label: 'Park Code',
  },
  {
    id: 'visited',
    numeric: true,
    disablePadding: false,
    label: 'Visted',
  },
  // {
  //   id: 'protein',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Protein (g)',
  // },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'} padding={headCell.disablePadding ? 'none' : 'normal'} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  const { data: session } = useSession();

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}>
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
          <p>National Parks</p>
          {/*prettier-ignore*/}
          {session ? (
            <div>
              {/*@ts-ignore*/}
              Signed in as {session!.user.email}
              {/*@ts-ignore*/}
              <Button variant='outlined' onClick={() => signOut(undefined, { callbackUrl: '/' })}>
                Sign out
              </Button>
            </div>
          ) : (
            <Button variant='contained' onClick={() => signIn(undefined, { callbackUrl: '/parks' })}>
              Sign in
            </Button>
          )}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function ParkList(props: any) {
  let userEmail = undefined;
  const { data: session } = useSession();

  if (session) {
    //console.log('session==>', session);
    /*@ts-ignore*/
    userEmail = session.user.email;
    // console.log('email', userEmail);
    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userEmail), // body data type must match "Content-Type" header
    })
      .then(data => data.json())
      .then(data => {
        setUser(data);
      });
  }

  // const userEmail = session.user.email;
  //const userEmail = props.userEmail;

  //const [email, setEmail] = useState('');

  const [parks, setParks] = useState([]);
  const [user, setUser] = useState('');
  const [visits, setVisits] = useState([]);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Park>('state');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Park) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      /*@ts-ignore*/
      const newSelected = parks.map(n => n.park_name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - parks.length) : 0;

  useEffect(() => {
    fetch('/api/allParks')
      .then(data => data.json())
      .then(data => {
        setParks(data.allParks);
      });
  }, []);

  // useEffect(() => {
  //   if (userEmail !== undefined) {
  //     fetch('http://localhost:3000/api/user', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(userEmail), // body data type must match "Content-Type" header
  //     })
  //       .then(data => data.json())
  //       .then(data => {
  //         setUser(data);
  //       });
  //   }
  // }, [userEmail]);

  useEffect(() => {
    if (user) {
      /*@ts-ignore*/
      fetch('/api/visits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        /*@ts-ignore*/
        body: JSON.stringify(user.pk_user_id), // body data type must match "Content-Type" header
      })
        .then(data => data.json())
        .then(data => {
          //console.log('data==>', data);
          setVisits(data.map(v => v.fk_park_id));

          //console.log('visits==>', visits);
        });
    }
  }, [user]);

  return (
    <>
      {/*@ts-ignore*/}
      <h1>Hello {user ? user.username : ''}</h1>
      {/* <h1>your visits: {visits}</h1> */}

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={dense ? 'small' : 'medium'}>
              {/*@ts-ignore*/}
              <EnhancedTableHead numSelected={selected.length} order={order} orderBy={orderBy} onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={parks.length} />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                rows.sort(getComparator(order, orderBy)).slice() */}
                {stableSort(parks, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    /*@ts-ignore*/
                    const isItemSelected = isSelected(row.park_name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      /*@ts-ignore*/
                      <TableRow hover onClick={event => handleClick(event, row.park_name)} role='checkbox' aria-checked={isItemSelected} tabIndex={-1} key={row.park_name} selected={isItemSelected}>
                        <TableCell padding='checkbox'>
                          <Checkbox
                            color='primary'
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell component='th' id={labelId} scope='row' padding='none'>
                          {<Link href={`/parks/${row.park_code}`}>{row.park_name}</Link>};
                        </TableCell>
                        <TableCell align='right'>{row.state}</TableCell>
                        <TableCell align='right'>{row.park_code}</TableCell>
                        {/*@ts-ignore*/}
                        <TableCell align='right'>{`${visits.includes(row.pk_park_id) ? 'Yes' : 'No'}`}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination rowsPerPageOptions={[5, 10, 25]} component='div' count={parks.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
        </Paper>
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label='Dense padding' />
      </Box>
    </>
  );
}

//console.log('parks==>', parks);

// You can return Date, Map, Set, etc.
// return (
//   <>
//     {parks.map(park => (
//       <p key={park.pk_park_id}>
//         {park.park_name}
//         {park.park_code}
//       </p>
//     ))}
//     testing
//   </>
// );
//}
