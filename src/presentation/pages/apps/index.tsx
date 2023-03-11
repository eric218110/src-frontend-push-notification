import { Backdrop, CircularProgress, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { useQueryListAllApplications } from '@presentation/query/list-all-applications'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppsPage } from './view-model'

export const AppsPage = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const navigate = useNavigate()
  const { table } = useAppsPage()

  const loadCurrentPageCalc = useCallback(() => {
    if (page > 0) {
      return page * rowsPerPage
    }
    return 0
  }, [page])

  const { data, isLoading } = useQueryListAllApplications(
    rowsPerPage,
    loadCurrentPageCalc()
  )

  const rows = data?.items?.map(item => table.createData(item))

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handlerOnClickItem = (id: number) => {
    navigate(`/apps/${id}`)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Backdrop
        sx={{
          color: theme => theme.palette.primary.main,
          zIndex: theme => theme.zIndex.drawer + 1
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <TableContainer sx={{ maxHeight: 573, overflowY: 'hidden' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {table.columns?.map(column => (
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
            {rows?.map(row => {
              return (
                <TableRow
                  hover
                  sx={{ cursor: 'pointer' }}
                  role="checkbox"
                  key={Math.random().toString()}
                  onClick={() => {
                    handlerOnClickItem(row.id)
                  }}
                >
                  {table.columns?.map(column => {
                    const value = row[column.id]
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
        count={Number(data?.count)}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
