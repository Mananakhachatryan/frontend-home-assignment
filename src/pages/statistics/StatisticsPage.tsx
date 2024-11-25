import React, { useMemo } from 'react'
import { Pie } from 'react-chartjs-2'
import { Paper, Typography, Box } from '@mui/material'
import { useUsers } from '@/context/usersContext'
import countries from '@/data/countries.json'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import LoadingScreen from '@/components/helpers/Loading'

ChartJS.register(ArcElement, Tooltip, Legend)

const ContainerStatistics: React.FC = () => {
  const { users } = useUsers()

  const isTablet = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'))

  const countryData = useMemo(() => {
    const data = users.reduce<Record<string, number>>((acc, user) => {
      user.country && (acc[user.country] = (acc[user.country] ?? 0) + 1)
      return acc
    }, {})

    return countries.map((country) => ({
      name: country,
      count: data[country] ?? 0,
    }))
  }, [users])

  const chartData = useMemo(() => {
    const labels = countryData.map((item) => item.name)
    const values = countryData.map((item) => item.count)
    const colors = countryData.map(
      (_, index) => `hsl(${(index * 360) / countryData.length}, 70%, 50%)`,
    )
    return {
      labels,
      datasets: [
        {
          label: 'Users by Country',
          data: values,
          backgroundColor: colors,
          hoverOffset: 4,
        },
      ],
    }
  }, [countryData])

  const chartOptions: ChartOptions<'pie'> = useMemo(
    () => ({
      plugins: {
        legend: {
          position: 'left',
          align: 'start',
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
      },
      maintainAspectRatio: false,
    }),
    [],
  )

  if (!users.length) {
    return <LoadingScreen message="Fetching statistics..." />
  }

  return (
    <Box
      sx={{
        paddingTop: isTablet ? '100px' : '30px',
        paddingX: '16px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <Typography variant="h3" component="h3">
          Statistics
        </Typography>
      </Box>
      <Paper
        id="scrollable-paper"
        elevation={2}
        sx={{
          height: 'calc(100vh - 260px)',
          padding: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {users.length > 0 ? (
          <Box sx={{ width: '100%', height: '100%' }}>
            <Pie data={chartData} options={chartOptions} />
          </Box>
        ) : (
          <Typography>No users available to display statistics.</Typography>
        )}
      </Paper>
    </Box>
  )
}

export default ContainerStatistics
