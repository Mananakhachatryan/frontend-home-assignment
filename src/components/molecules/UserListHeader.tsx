import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import SearchBar from '@/components/molecules/SearchBar'

interface UserListHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onAddUser: () => void
  isTablet: boolean
  totalUsers: number
  isAddUserDisabled: boolean
}

const UserListHeader: React.FC<UserListHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onAddUser,
  isTablet,
  totalUsers,
  isAddUserDisabled,
}) => (
  <>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}
    >
      <Typography variant="h3" component="h3">
        Users List <span className="italic">({totalUsers})</span>
      </Typography>
      {isTablet && (
        <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={onAddUser}
        disabled={isAddUserDisabled}
      >
        Add User
      </Button>
    </Box>
    {!isTablet && (
      <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />
    )}
  </>
)

export default UserListHeader
