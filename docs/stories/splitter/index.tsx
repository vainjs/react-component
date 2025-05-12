import { Splitter, Panel } from '@vainjs/rc'
import { Flex } from 'antd'

const App = () => {
  return (
    <Splitter style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <Panel>
        <Flex justify="center" align="center" style={{ height: '100%' }}>
          Panel1
        </Flex>
      </Panel>
      <Panel>
        <Flex justify="center" align="center" style={{ height: '100%' }}>
          Panel2
        </Flex>
      </Panel>
    </Splitter>
  )
}
export default App
