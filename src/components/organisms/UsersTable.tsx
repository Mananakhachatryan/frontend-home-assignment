import React, { useState, useEffect, useMemo } from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Paper,
} from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'
import { User } from '@/types/userType'
import EditableRow from '@/components/organisms/EditableRow'

interface UsersTableProps {
  users: User[]
  onSave: (updatedUser: User) => void
  onDelete: (id: string) => void
  addingUserId: string | null
  isSearchActive: boolean
  updateErrorCounts: (
    id: string,
    errors: { empty: number; invalid: number },
  ) => void
}

const USERS_BATCH_SIZE = 10

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onSave,
  onDelete,
  addingUserId,
  isSearchActive,
  updateErrorCounts,
}) => {
  const initialDisplayedUsers = useMemo(
    () => users.slice(0, USERS_BATCH_SIZE),
    [users],
  )

  const [displayedUsers, setDisplayedUsers] = useState(users.slice(0, 10))
  const [hasMore, setHasMore] = useState(users.length > USERS_BATCH_SIZE)

  useEffect(() => {
    setDisplayedUsers(initialDisplayedUsers)
    setHasMore(users.length > initialDisplayedUsers.length)
  }, [users, isSearchActive, initialDisplayedUsers])

  const loadMore = () => {
    const nextUsers = users.slice(
      displayedUsers.length,
      displayedUsers.length + USERS_BATCH_SIZE,
    )
    setDisplayedUsers((prev) => [...prev, ...nextUsers])
    setHasMore(users.length > displayedUsers.length + nextUsers.length)
  }

  const reloadIfNeeded = () => {
    return (
      displayedUsers.length >= USERS_BATCH_SIZE ||
      users.length <= USERS_BATCH_SIZE ||
      setDisplayedUsers((prev) => [
        ...prev,
        ...users.slice(
          displayedUsers.length,
          displayedUsers.length + USERS_BATCH_SIZE,
        ),
      ])
    )
  }
  return (
    <Paper
      id="scrollable-paper"
      elevation={2}
      sx={{
        height: 'calc(100vh - 260px)',
        overflowY: 'auto',
        padding: '16px',
      }}
    >
      <InfiniteScroll
        dataLength={displayedUsers.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <Box
            sx={{ display: 'flex', justifyContent: 'center', padding: '16px' }}
          >
            <CircularProgress />
          </Box>
        }
        scrollableTarget="scrollable-paper"
      >
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedUsers.map((user, index) => (
              <EditableRow
                key={user.id}
                user={user}
                onSave={onSave}
                onDelete={(id: string) => {
                  onDelete(id)
                  reloadIfNeeded()
                }}
                isEditing={addingUserId === user.id}
                isNewRow={index === 0 && user.name === ''}
                updateErrorCounts={updateErrorCounts}
              />
            ))}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </Paper>
  )
}

export default UsersTable
