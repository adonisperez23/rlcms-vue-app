export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: {
      dateFormat(date: string):string
    }
  }
}
