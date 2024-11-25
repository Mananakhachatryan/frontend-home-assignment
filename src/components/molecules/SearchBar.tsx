import React from 'react'
import { TextField, Box } from '@mui/material'
import { styled } from '@mui/system'

interface SearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '400px',
  borderRadius: '30px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '30px',
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
    },
  },
}))

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <StyledTextField
        fullWidth
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name, email, phone, or country"
      />
    </Box>
  )
}

export default SearchBar
