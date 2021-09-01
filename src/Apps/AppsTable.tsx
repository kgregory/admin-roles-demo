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
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { apps } from "core/constants/data";
import type { AppData } from "core/constants/data";
import stableSort from "core/utils/stableSort";
import getComparator from "core/utils/getComparator";

type Order = "asc" | "desc";

interface HeadCell {
  id: keyof AppData;
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
  { id: "isActive", numeric: false, label: "Status", sortable: false }
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

interface EnhancedTableHeadProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof AppData
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const classes = useTableHeadStyles();
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof AppData) => (
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
    avatar: { background: theme.palette.secondary.main },
    disabled: { opacity: theme.palette.action.disabledOpacity }
  })
);

interface EnhancedTableProps {
  onClick: () => void;
}

function EnhancedTable({ onClick }: EnhancedTableProps) {
  const classes = useTableStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof AppData>("name");
  const [selected, setSelected] = React.useState<string[]>([]);
  const page = 0;
  const rowsPerPage = 6;

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof AppData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = apps.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    onClick();
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, apps.length - page * rowsPerPage);

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
              rowCount={apps.length}
            />
            <TableBody>
              {stableSort(apps, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((app, index) => {
                  const isItemSelected = isSelected(app.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover={app.isEnabledOnPlatform}
                      onClick={
                        app.isEnabledOnPlatform
                          ? (event) => handleClick(event, app.name)
                          : undefined
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={app.name}
                      selected={isItemSelected}
                      className={
                        !app.isEnabledOnPlatform ? classes.disabled : undefined
                      }
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        <Avatar className={classes.avatar}>
                          {app.initials}
                        </Avatar>
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row">
                        {app.name}
                        {!app.isEnabledOnPlatform ? (
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            display="block"
                          >
                            This app has been disabled on the platform
                          </Typography>
                        ) : null}
                      </TableCell>
                      <TableCell>{app.storisUserId}</TableCell>
                      <TableCell>{app.createdDate}</TableCell>
                      <TableCell>{app.activeDate}</TableCell>
                      <TableCell>
                        {!app.isEnabledOnPlatform
                          ? "Unavailable"
                          : (app.isActive && "Active") || "Deactivated"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
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
