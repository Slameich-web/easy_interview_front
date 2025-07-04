import Typography from "@mui/material/Typography";
import styles from "./Form.module.scss";
import { useState } from "react";
import Input from "../../Input";
import Button from "../../Button";
import { ErrorMessage } from "../../ErrorMessage";
import { LoadingSpinner } from "../../LoadingSpinner";

interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => Promise<void>;
  buttonTitle: string;
  isLoading?: boolean;
  error?: string;
}

const Form = ({ title, handleClick, buttonTitle, isLoading = false, error }: FormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    
    await handleClick(email, password);
  };

  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <Typography variant="h2">{title}</Typography>
      
      {error && <ErrorMessage message={error} sx={{ mb: 2 }} />}
      
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        disabled={isLoading}
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        required
        disabled={isLoading}
      />
      
      <Button 
        type="submit" 
        disabled={isLoading || !email.trim() || !password.trim()}
        sx={{ position: 'relative' }}
      >
        {isLoading ? <LoadingSpinner size={20} /> : buttonTitle}
      </Button>
    </form>
  );
};

export default Form;