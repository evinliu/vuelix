import { makeInstall } from './../utils/install';
import { components } from './components'
import '@toy-element/theme/index.css'

const installer = makeInstall(components)

export default installer
export * from '@toy-element/components'