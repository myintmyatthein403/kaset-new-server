export const getMethodAndProvider = (name: string) => {
  switch (name) {
    case 'kbz_pay_qr':
      return {
        method: "QR",
        provider: "KBZ pay"
      }
  }
}
