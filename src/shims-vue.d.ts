declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}

declare module '*.md' {
  const str: string
  export default str
}

declare interface Window {
  $message: any,
  $dialog: any,
  $loading: any
}