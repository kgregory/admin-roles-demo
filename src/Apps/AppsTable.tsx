import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@material-ui/icons/IndeterminateCheckBoxOutlined";

interface Data {
  initials: string;
  name: string;
  storisUserId: string;
  createdDate: string;
  activeDate: string;
  isActive: boolean;
  isEnabledOnPlatform: boolean;
}

function createData(
  initials: string,
  name: string,
  storisUserId: string,
  createdDate: string,
  activeDate: string,
  isActive: boolean,
  isEnabledOnPlatform: boolean
): Data {
  return {
    initials,
    name,
    storisUserId,
    createdDate,
    activeDate,
    isActive,
    isEnabledOnPlatform
  };
}

const rows = [
  createData(
    "DW",
    "Data Warehouse",
    "SRD",
    "9/20/1995",
    "9/1/2021",
    true,
    true
  ),
  createData("ES", "eSTORIS", "ZZZ", "8/23/2018", "7/15/2021", true, true),
  createData(
    "EC",
    "eSTORIS Classic",
    "SRD",
    "8/16/2011",
    "11/26/2015",
    true,
    true
  ),
  createData(
    "MS",
    "Mobile STORIS (the one that ran on pocket PC)",
    "ZZZ",
    "1/23/1989",
    "11/23/2007",
    false,
    false
  ),
  createData("ER", "eRoam", "SED", "11/2/2013", "11/2/2013", false, false),
  createData(
    "HC",
    "Tito's `Hello Customer` button",
    "TR",
    "11/2/2013",
    "11/2/2013",
    false,
    true
  )
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
  sortable: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "name",
    numeric: false,
    label: "Name",
    sortable: true
  },
  {
    id: "storisUserId",
    numeric: false,
    label: "STORIS User ID",
    sortable: true
  },
  {
    id: "createdDate",
    numeric: false,
    label: "Created Date",
    sortable: true
  },
  {
    id: "activeDate",
    numeric: false,
    label: "Last Active",
    sortable: false
  },
  { id: "isActive", numeric: false, label: "Active", sortable: false }
];

const useTableHeadStyles = makeStyles(
  createStyles({
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1
    }
  })
);

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const classes = useTableHeadStyles();
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell key="initials"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding="normal"
            sortDirection={
              headCell.sortable && orderBy === headCell.id ? order : false
            }
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    title: {
      flex: "1 1 100%"
    }
  })
);

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Apps
      </Typography>
    </Toolbar>
  );
};

const useTableStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2)
    },
    table: {
      minWidth: 750
    },
    avatar: { background: theme.palette.secondary.main }
  })
);

function EnhancedTable() {
  const classes = useTableStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
  const [selected, setSelected] = React.useState<string[]>([]);
  const page = 0;
  const rowsPerPage = 6;

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {};

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        <Avatar className={classes.avatar}>
                          {row.initials}
                        </Avatar>
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row">
                        {row.name}
                        {!row.isEnabledOnPlatform ? (
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            display="block"
                          >
                            This app has been disabled on the platform
                          </Typography>
                        ) : null}
                      </TableCell>
                      <TableCell>{row.storisUserId}</TableCell>
                      <TableCell>{row.createdDate}</TableCell>
                      <TableCell>{row.activeDate}</TableCell>
                      <TableCell>
                        {row.isEnabledOnPlatform && row.isActive ? (
                          <CheckOutlinedIcon />
                        ) : (
                          (!row.isEnabledOnPlatform && (
                            <IndeterminateCheckBoxOutlinedIcon />
                          )) ||
                          null
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default EnhancedTable;
