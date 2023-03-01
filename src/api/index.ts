import axios from 'axios';
import { BBSApi } from './api';
import { Hoyo } from './utils/Hoyo';
import { GetRegionType, Region, RegionType, getRegionType } from "./utils/Region";
import { APIStencilOption } from './interface/basicAPI.interface';

type BasicParams = 'act_id' | 'uid' | 'region' | 'server'

export class GenshinAPI<U extends `${number}` = never, R extends RegionType = GetRegionType<U>> {
    #cookie: string
    #region: R
    #hoyoKit: Hoyo
    private params: Record<BasicParams, any>

    constructor(uid: U, cookie?: string) {
        this.#cookie = cookie
        this.#region = getRegionType(uid) as R
        this.#hoyoKit = new Hoyo(uid)

        this.params = {
            act_id: this.#hoyoKit.act_id,
            uid,
            region: this.#region,
            server: this.#region
        }
    }

    get region() {
        return this.#region
    }

    get hoyo() {
        return this.#hoyoKit
    }

    param<K extends BasicParams>(feilds: K[]): Pick<typeof this.params, K> {
        // @ts-ignore
        return !this.params || feilds.length === 0 ? {} : Object.entries(this.params).filter(([k, v]) => feilds.includes(k))
    }

    async fetch<Api extends BBSApi.Keys<R>, Params extends BBSApi.Params<R, Api>>(api: Api, params: Params, sign: boolean = false): Promise<BBSApi.RequestTyper<R>> {
        const region = this.#region === RegionType.CN || this.#region === RegionType.CNB ? 'cn' : 'os'
        const regionURL = BBSApi.region[region]
        const thisApi: APIStencilOption = BBSApi.stencil[api.toString()]
        let host: URL, body: BodyInit, qury: string
        if (thisApi.hostBy) {
            host = new URL(regionURL[`${typeof thisApi.hostBy === 'string' ? thisApi.hostBy : thisApi.hostBy[region]}`])
            host.pathname = typeof thisApi.url === 'string' ? thisApi.url : thisApi.url[region]
        } else {
            host = new URL(typeof thisApi.url === 'string' ? thisApi.url : thisApi.url[region])
        }
        if (thisApi.method === 'GET') {
            qury = new URLSearchParams(params as unknown as URLSearchParams).toString()
        } else {
            body = params as unknown as BodyInit
        }
        return (await axios({
            url: host.href,
            data: body ?? undefined,
            headers: sign ? this.#hoyoKit.signHeader(this.#cookie) : this.#hoyoKit.headers(this.#cookie, qury ? params : undefined, body ? params : undefined)
        })).data as any
    }
}
