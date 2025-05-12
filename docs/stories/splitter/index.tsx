import { Splitter, Panel } from '@vainjs/rc'
import { Flex } from 'antd'

const App = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Splitter style={{ height: '100%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <Panel>
          <Flex justify='center' align='center' style={{ height: '100%' }}>
            Panel1
          </Flex>
        </Panel>
        <Panel>
          <Flex justify='center' align='center' style={{ height: '100%' }}>
            Panel2
          </Flex>
        </Panel>
      </Splitter>
    </div>
  )
}
export default App
