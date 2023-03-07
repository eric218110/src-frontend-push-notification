import { Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'

interface Column {
  id: 'name' | 'webPush' | 'email' | 'sms'
  label: string
  minWidth?: number
  align?: 'center'
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Nome', minWidth: 170 },
  { id: 'webPush', label: 'Web Push', minWidth: 100, align: 'center' },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'sms',
    label: 'SMS',
    minWidth: 170,
    align: 'center'
  }
]

interface Data {
  name: string
  webPush: boolean
  email: boolean
  sms: boolean
}

function createData(
  name: string,
  webPush: boolean,
  email: boolean,
  sms: boolean
): Data {
  return { name, webPush, email, sms }
}

const rows = [
  createData('India', true, false, false),
  createData('China', true, false, false),
  createData('Italy', true, false, false),
  createData('Brasil', true, false, false),
  createData('dddd', true, false, false),
  createData('w', true, false, false),
  createData('eeeee', true, false, false),
  createData('wee', true, false, false),
  createData('wfew', true, false, false),
  createData('424tz', true, false, false),
  createData('444', true, false, false),
  createData('we4t', true, false, false),
  createData('wetyw34w', true, false, false),
  createData('sdfsdf', true, false, false),
  createData('sdfsdfsdf', true, false, false),
  createData('werwe', true, false, false),
  createData('United States', true, false, false)
]

export const AppsPage = () => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
    console.log(newPage, rowsPerPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 573, overflowY: 'hidden' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={Math.random().toString()}
                  >
                    {columns.map(column => {
                      const value = row[column.id]
                      console.log(row)
                      if (typeof value === 'boolean') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value ? (
                              <Typography>Habilitado</Typography>
                            ) : (
                              <Typography color="GrayText">
                                Desabilitado
                              </Typography>
                            )}
                          </TableCell>
                        )
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
