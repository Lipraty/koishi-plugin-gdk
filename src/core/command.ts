import { Argv, Context, Schema } from "koishi";

declare module 'koishi' {
    namespace Argv {
        interface Domain {
            UID: string
        }
    }
}

Argv.createDomain('UID', source => {
    if (/[0-9]/g.test(source))
        return source
    else
        throw new Error(`"${source}"不是一个正确的uid`)
})

class GenshinCommand {
    constructor(private ctx: Context, private config: GenshinCommand.Config) {
        ctx.i18n.define('zh', require('../locales/zh'))

        const namer = GenshinCommand.cname
        ctx.command('genshin').action(async ({ session }) => { session.execute('genshin -h') })

        ctx.command(`${namer}.uid <uid:UID>`)
            .option('bind', '-b')
            .option('append', '-a')
            .option('remove', '-r')
            .option('default', '-d')
            .userFields([])
            .action(async ({ session, options }, uid) => {

            })

        ctx.private().command(`${namer}.cookie <cookie:string>`)
            .option('bind', '-b')
            .option('remove', '-r')
            .action(async ({ session, options }, cookie) => {

            })
    }
}

namespace GenshinCommand {
    export const cname = 'genshin'
    export interface Config { }
    export const Config: Schema<Config> = Schema.object({}).description('命令设置')
}

export default GenshinCommand
