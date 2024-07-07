import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable(props) {
  const rows = Object.keys(props.masteryLevels || {}).map((topic) => ({
    topic,
    masteryLevel: props.masteryLevel[topic].level,
    explanation: props.masteryLevel[topic].explanation,
  }));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Topic</TableCell>
            <TableCell align="right">Mastery level</TableCell>
            <TableCell align="right">Explanation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{row.topic}</TableCell>
              <TableCell align="right">{row.masteryLevel}</TableCell>
              <TableCell align="right">{row.explanation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
