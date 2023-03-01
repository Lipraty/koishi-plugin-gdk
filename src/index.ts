import { Context, Schema, Service } from 'koishi'

class GenshinKit extends Service {
  constructor(app: Context, config: GenshinKit.Config){
    super(app, 'genshinkit', true)
  }
}

namespace GenshinKit {
  export interface Config { }

  export const Config: Schema<Config> = Schema.object({})
}
