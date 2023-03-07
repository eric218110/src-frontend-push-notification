import { ResponsePaginationApplicationItemsTypes } from '@domain/models/application'
import { Backdrop, CircularProgress, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { useFetchAllApplications } from '@presentation/store/features/application'
import { fetchAllApplication } from '@presentation/store/features/application/application-adapter'
import { useAppDispatch } from '@presentation/store/reducer'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  id: number
  name: string
  webPush: boolean
  email: boolean
  sms: boolean
}

const createData = ({
  app_name,
  channel,
  id
}: ResponsePaginationApplicationItemsTypes): Data => {
  return {
    id,
    name: app_name,
    webPush: channel.webpush,
    email: channel.email,
    sms: channel.sms
  }
}

export const AppsPage = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const dispath = useAppDispatch()
  const { isLoading, showAllApplication } = useFetchAllApplications()
  const navigate = useNavigate()

  const rows = showAllApplication?.items?.map(item => createData(item))

  const loadAllApplication = (take: number, skip: number) => {
    dispath(fetchAllApplication({ take, skip }))
  }

  useEffect(() => {
    loadAllApplication(rowsPerPage, 0)
  }, [rowsPerPage])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
    dispath(
      fetchAllApplication({ take: rowsPerPage, skip: newPage * rowsPerPage })
    )
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
              {columns?.map(column => (
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
                  {columns?.map(column => {
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
        count={showAllApplication.count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
