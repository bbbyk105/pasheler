export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** API へ送る内容（フォームの入力 + Turnstile のトークン） */
export interface ContactRequestBody extends ContactFormData {
  turnstileToken?: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  error?: string;
}
