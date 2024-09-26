// ReusableTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const UserTable = ({ columns, data, renderActions }: any) => {
  console.log(columns)
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column: any) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any, index: any) => (
            <TableRow key={index}>
              {columns.map((column: any) => {
                // Check if the column is for actions
                if (column.id === 'actions' && renderActions) {
                  return (
                    <TableCell key={column.id}>
                      {renderActions(row)} {/* Call the renderActions function */}
                    </TableCell>
                  );
                }
                return <TableCell key={column.id}>{row[column.id]}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
