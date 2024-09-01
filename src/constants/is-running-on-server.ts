/* variavel para verificar se a pagina está rodando no cliente ou servidor */
export const isRunningOnServer = typeof window === 'undefined' ? true : false;
