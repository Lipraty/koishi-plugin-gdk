import { Context, Schema, Service } from 'koishi'
import GenshinCommand from './core/command'

declare module 'koishi' {
  interface Context {
    genshin: GDK
  }
}

class GDK extends Service {
  constructor(app: Context, config: GDK.BasicConfig) {
    super(app, 'gdk', true)
    app.plugin(GenshinCommand, config)
  }

  cname: string = GenshinCommand.cname
}

namespace GDK {
  export interface BasicConfig { }
  export const BasicConfig: Schema<BasicConfig> = Schema.object({})

  export type Config = BasicConfig & GenshinCommand.Config
  export const Config: Schema<Config> = Schema.intersect([
    BasicConfig,
    Schema.union([
      GenshinCommand.Config
    ])
  ])
}

export default GDK
