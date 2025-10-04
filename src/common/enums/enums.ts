export enum ACCOUNT_STATUS {
  ACTIVE = "active",
  DEACTIVATED_BY_USER = "deactivated_by_user",
  DEACTIVATED_BY_ADMIN = "deactivated_by_admin",
  SUSPENDED_TEMPORARILY = "suspended_temporarily",
  SUSPENDED_PERMANENT = "suspended_permanent",
  BANNED = "banned",
  LOCKED_TOO_MANY_ATTEMPTS = "locked_too_many_attempts",
  PENDING_EMAIL_VERIFICATION = "pending_email_verification"
}


export enum TOKEN_TYPE {
  PASSWORD_RESET = "password_reset",
  EMAIL_VERIFY = "email_verify",
  PHONE_VERIFY = "phone_verify",
  TWO_FA_SETUP = "two_fa_setup"
}


export enum HTTP_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH"
}


export enum SOCIAL_PROVIDERS {
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK",
}


export enum GENDER_TYPES {
  MALE = 'male',
  FEMALE = "female",
  OTHER = "other"
}

export enum ORDER_STAUTS {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped'
}

export enum PAYMENT_STATUS {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled'
}

export enum PAYMENT_METHOD {
  COD = "cod",
  CARD = "card",
  KBZ_PAY_QR = "kbz_pay_qr",
  KBZ_PAY_PWA = "kbz_pay_pwa"
}

export enum LYRIC_TYPE {
  IMAGE = "image",
  TEXT = "text"
}
