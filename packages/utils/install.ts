import type { App, Plugin } from 'vue'
import { map } from 'fp-ts/Array'
import { fromNullable, map as mapOption } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

export type SFCWithInstall<T> = T & Plugin & { install: (app: App) => void }

/**
 * 批量安装多个组件
 * @param components 组件数组
 * @returns 安装函数
 */
export const makeInstall = (components: Plugin[]) => {
  const installer = (app: App) => {
    pipe(
      components,
      map((comp: Plugin) => app.use(comp))
    )
  }
  return installer as Plugin
}

/**
 * 为单个组件添加 install 方法
 * @param component 组件
 * @returns 带有 install 方法的组件
 */
export const withInstall = <T>(component: T) => {
  (component as Plugin).install = (app: App) => {
    pipe(
      (component as any).name as string,
      fromNullable,
      mapOption((name: string) => app.component(name, component as Plugin))
    )
  }
  return component as SFCWithInstall<T>
}

