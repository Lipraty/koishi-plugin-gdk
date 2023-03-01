# koishi-plugin-genshinkit

[![npm](https://img.shields.io/npm/v/koishi-plugin-genshinkit?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-genshinkit)

给 Genshin 系列插件开发者的开箱即用的开发大礼包，用于 Koishi 插件的通用原神开发套件。

## 功能

- **完整 UID 工具类**: 在类型以及使用中提供了完整的 UID 地区格式化方式，无需繁琐的类型体操，就能获得完整的地区支持；
- **标准化 API**: 内置原神相关 API 地址，并通过通用方法进行请求，无需手打拼接地址；
- **基准抽卡算法**: 均等概率的抽卡算法（当然，软件随机并不是硬随机）；
- **(WIP) Enka 数据**: 为 Enka.Network 数据提供多种标准转换，无需手动转换各类数据；
- **(WIP) 基准伤害计算模型**: 可以根据 GenshinKit.Characters 标准角色数据来计算伤害，包括不同武器替换后的计算、期待值、不同原魔伤害计算
- ...也许还可以更多

## 用于 Koishi 的通用原神游戏数据存储标准

规划中

## 扩展的服务

使用 `ctx.genshin` 来访问。
