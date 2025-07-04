import Typography from "@mui/material/Typography";
import styles from "./Form.module.scss";
import { useState } from "react";
import Input from "../../Input";
import Button from "../../Button";

interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
  buttonTitle: string;
}

const Form = ({ title, handleClick, buttonTitle }: FormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.Form}>
      <Typography variant="h2">{title}</Typography>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button onClick={() => handleClick(email, password)}>
        {buttonTitle}
      </Button>
    </div>
  );
};

export default Form;
