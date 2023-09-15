import { useContext } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import { MapBoxLayer } from '../../components/mapbox/MapBoxLayer'
import { GraphByDepartaments } from './GraphByDepartaments'
import { GraphByMonths } from './GraphByMonths'
import { CommonContext } from '../../context/commonContext/CommonContext_'

export const TabNavigator = () => {
  const { tab, setTabPosition } = useContext(CommonContext)

  const handleSelected = (newValue: number) => {
    setTabPosition(newValue)
  }

  return (
    <div className="tabContext">
      {/* <TabContext value={tab.toString()}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} variant="scrollable">
            <Tab color="white" label="Departamentos" value="1" />
            <Tab label="Gráficos por periodo de tiempo" value="2" />
            <Tab label="Gráficos por departamentos" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <MapBoxLayer />
        </TabPanel>
        <TabPanel value="2">
          <GraphByMonths />
        </TabPanel>
        <TabPanel value="3">
          <GraphByDepartaments />
        </TabPanel>
      </TabContext> */}
      <Tabs
        selected={true}
        selectedIndex={tab}
        /* selectedIndex={tab} */
        onSelect={handleSelected}
        /* onChange={(index) => {
          console.log(index)
        }} */
      >
        <TabList>
          <Tab>Departamentos</Tab>
          <Tab>Gráficos por periodo de tiempo</Tab>
          <Tab>Gráficos por departamentos</Tab>
        </TabList>

        <TabPanel>{/* <MapBoxLayer /> */}</TabPanel>
        <TabPanel>
          <GraphByMonths />
        </TabPanel>
        <TabPanel>
          <GraphByDepartaments />
        </TabPanel>
      </Tabs>
    </div>
  )
}
