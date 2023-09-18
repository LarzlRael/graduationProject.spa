import { useContext } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

/* import { MapBoxLayer } from '../../components/mapbox/MapBoxLayer' */
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
      <Tabs selected={true} selectedIndex={tab} onSelect={handleSelected}>
        <TabList>
          {/* <Tab>Departamentos</Tab> */}
          <Tab>Gráficos por periodo de tiempo</Tab>
          <Tab>Gráficos por departamentos</Tab>
        </TabList>

        {/* <TabPanel>{ <MapBoxLayer />}</TabPanel> */}
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
