export async function setupVConsole() {
  const { default: VConsole } = await import('vconsole')
  const vConsole = new VConsole()
  console.log('vConsole', vConsole.version)
}
