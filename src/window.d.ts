interface Window {
  /**
   * The hydration function is used to hydrate the client-side state
   * 
   * with the server-side state.
   */
  hydrate: (hydration: any) => void
  loadLangHandle: any
}
