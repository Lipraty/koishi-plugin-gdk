import { Context } from "koishi";
import {} from '@koishijs/plugin-adapter-onebot'


export default class GenshinTemplate {
    constructor(private ctx: Context) {

    }

    async start() {
        this.ctx.component('card', async (attrs, childrens, session) => {
            return <></>
        })
    }
}