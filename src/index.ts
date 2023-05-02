import { Context, Schema, Service } from 'koishi'
import GenshinCommand from './core/command'

declare module 'koishi' {
  interface Context {
    genshin: Genshin
  }
}

class Genshin extends Service {
  constructor(app: Context, config: Genshin.BasicConfig) {
    super(app, 'genshin', true)
    app.command('genshin').action(async ({ session }) => { session.execute('genshin -h') })
    app.plugin(GenshinCommand, config)
  }

  cname: string = GenshinCommand.cname
}

namespace Genshin {
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

export default Genshin
