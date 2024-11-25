import React, { useState, useMemo, useCallback } from 'react'
import { useUsers } from '@/context/usersContext'
import UsersTable from '@/components/organisms/UsersTable'
import EmptyData from '@/components/helpers/EmptyData'
import ErrorSummary from '@/components/molecules/ErrorSummary'
import UserListHeader from '@/components/molecules/UserListHeader'
import LoadingScreen from '@/components/helpers/Loading'
import { Box, useMediaQuery } from '@mui/material'
import { Theme } from '@mui/material/styles'
import NotificationToast, {
  notifySuccess,
} from '@/components/molecules/NotificationToast'

const ContainerUsers: React.FC = () => {
  const { users, setUsers } = useUsers()
  const [searchQuery, setSearchQuery] = useState('')
  const [addingUserId, setAddingUserId] = useState<string | null>(null)
  const [rowErrorCounts, setRowErrorCounts] = useState<
    Record<string, { empty: number; invalid: number }>
  >({})

  const isTablet = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'))

  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase()
    return users.filter((user) =>
      [user.name, user.country, user.email, user.phone]
        .map((field) => field.toLowerCase())
        .some((value) => value.includes(query)),
    )
  }, [users, searchQuery])

  const totalErrors = useMemo(() => {
    return Object.values(rowErrorCounts).reduce(
      (acc, counts) => {
        acc.empty += counts.empty
        acc.invalid += counts.invalid
        return acc
      },
      { empty: 0, invalid: 0 },
    )
  }, [rowErrorCounts])

  const handleAddUser = useCallback(() => {
    const newUser = {
      id: Date.now().toString(),
      name: '',
      country: '',
      email: '',
      phone: '',
    }
    setUsers([newUser, ...users])
    setAddingUserId(newUser.id)
  }, [setUsers, users])

  const handleSaveUser = useCallback(
    (updatedUser: (typeof users)[0]) => {
      const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user,
      )
      setUsers(updatedUsers)

      const isAdding = updatedUser.id === addingUserId
      notifySuccess(`User ${isAdding ? 'added' : 'edited'} successfully!`)

      isAdding && setAddingUserId(null)
    },
    [setUsers, users, addingUserId],
  )

  const handleDeleteUser = useCallback(
    (id: string) => {
      const isAddingUser = id === addingUserId
      const updatedUsers = users.filter((user) => user.id !== id)
      setUsers(updatedUsers)
      setRowErrorCounts((prev) => {
        const updatedCounts = { ...prev }
        delete updatedCounts[id]
        return updatedCounts
      })
      isAddingUser
        ? setAddingUserId(null)
        : notifySuccess('User removed successfully!')
    },
    [setUsers, users, addingUserId],
  )

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const updateErrorCounts = useCallback(
    (id: string, errorCounts: { empty: number; invalid: number }) => {
      setRowErrorCounts((prev) => ({
        ...prev,
        [id]: errorCounts,
      }))
    },
    [],
  )

  if (!users.length) {
    return <LoadingScreen message="Fetching users..." />
  }

  return (
    <Box
      sx={{
        paddingTop: isTablet ? '100px' : '30px',
        paddingX: '16px',
      }}
    >
      <UserListHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onAddUser={handleAddUser}
        isTablet={isTablet}
        totalUsers={users.length}
        isAddUserDisabled={Boolean(addingUserId)}
      />
      <NotificationToast />
      {!isTablet && (
        <Box sx={{ marginBottom: '16px' }}>
          <ErrorSummary
            emptyCount={totalErrors.empty}
            invalidCount={totalErrors.invalid}
          />
        </Box>
      )}

      {filteredUsers.length > 0 ? (
        <>
          <UsersTable
            users={filteredUsers}
            onSave={handleSaveUser}
            onDelete={handleDeleteUser}
            addingUserId={addingUserId}
            isSearchActive={searchQuery.length > 0}
            updateErrorCounts={updateErrorCounts}
          />
          {isTablet && (
            <ErrorSummary
              emptyCount={totalErrors.empty}
              invalidCount={totalErrors.invalid}
            />
          )}
        </>
      ) : (
        <EmptyData message="No users to display" />
      )}
    </Box>
  )
}

export default ContainerUsers
