import { defineConfig,Options,Format } from 'tsup'
import fg from 'fast-glob'


const baseConfigs = [
  {
    dts: true, // 添加 .d.ts 文件
    metafile: false, // 添加 meta 文件
    minify: true, // 压缩
    splitting: false,
    sourcemap: false, // 添加 sourcemap 文件
    clean: true, // 是否先清除打包的目录，例如 dist
    format: ['cjs'] as Format[]
  },
  {
    dts: true, // 添加 .d.ts 文件
    metafile: false, // 添加 meta 文件
    minify: true, // 压缩
    splitting: false,
    sourcemap: false, // 添加 sourcemap 文件
    clean: true, // 是否先清除打包的目录，例如 dist
    format: ['esm'] as Format[]
  }
]

const myReadfile = () => {
  const entries = fg.sync([`./qiankun/**.ts`, `./qiankun/**.tsx`], {
    onlyFiles: false,
    deep: Infinity,
    ignore: [`**/cli/**`, `**/node_modules/**`,`**/global.d.ts`]
  })
  const configs: Options[] = []
  console.log(entries,'-==-')
  baseConfigs.forEach((baseConfig) =>
    entries.forEach((file) => {
      configs.push({
        target: ['esnext'],
        entry: [file],
        outDir: `./npm/${baseConfig.format[0]}/`,
        loader: {
          '.js': 'jsx',
          '.jsx': 'jsx',
          '.tsx': 'tsx'
        },
        ...baseConfig,
      })
    })
  )
  return defineConfig(configs)
}

export default myReadfile()