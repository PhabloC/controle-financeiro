export interface CadastroFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CadastroState {
  isLoading: boolean;
  message: string;
  messageType: "success" | "error" | "";
}

export interface CadastroValidation {
  isValid: boolean;
  errors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
}
