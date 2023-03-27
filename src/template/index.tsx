import { Context } from "koishi";


export default class GenshinTemplate {
    constructor(private ctx: Context) {

    }

    async start() {
        this.ctx.component('card', async (attrs, childrens, session) => {
            return <></>
        })
    }
}