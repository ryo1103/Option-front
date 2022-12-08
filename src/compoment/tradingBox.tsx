import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: string) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', marginTop: '30px', marginLeft: '25%' }}>
      <Box>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="BUY" {...a11yProps('buy')} />
          <Tab label="SELL" {...a11yProps('sell')} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Stack justifyContent="space-around" height="180px">
          <TextField fullWidth label="数量" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
          <TextField fullWidth label="金额" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
          <Button variant="outlined">Confirm</Button>
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Stack justifyContent="space-around" height="180px">
          <TextField fullWidth label="数量" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
          <TextField fullWidth label="金额" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
          <Button variant="outlined">Confirm</Button>
        </Stack>
      </TabPanel>
    </Box>
  )
}
