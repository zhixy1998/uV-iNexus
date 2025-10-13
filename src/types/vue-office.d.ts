declare module '@vue-office/docx' {
    import { DefineComponent } from 'vue'
    const VueOfficeDocx: DefineComponent<{
      src: string | ArrayBuffer
      options?: Record<string, any>
    }>
    export default VueOfficeDocx
}