import { api } from "@services";
import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles({
  tableContainer: {
    maxWidth: 700,
  },
  table: {
    minWidth: 650,
  },
});

export default function Hello(props: any) {
  const { cars } = props;
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars?.map((car: any) => (
            <TableRow key={car?.id}>
              <TableCell component="th" scope="car?">
                <Link href={`/example/cars/${car?.Name}`}>{car?.Name}</Link>
              </TableCell>
              <TableCell align="right">{car?.Year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { data } = await api.get("/cars");

  return {
    props: {
      cars: data,
    },
  };
}
// export async function getStaticProps({ params }) {
//   const req = await fetch(`http://localhost:1337/cars`);
//   const data = await req.json();

//   console.log(data);
//   return {
//     props: {
//       cars: data,
//     },
//   };
// }
