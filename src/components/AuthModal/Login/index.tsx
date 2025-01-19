import { FC } from "react";
import { Input } from "../../Input";
import { Button } from "../../Button/styles";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyledForm } from "./styles";
import { useAuthStore } from "../../../stores/auth";

interface Props {
    max?: number;
}

type TLoginForm = {
    username: string;
    password: string;
};

const Login: FC<Props> = () => {
    const { handleSubmit, control } = useForm<TLoginForm>();
    const { login } = useAuthStore();

    const onSubmit: SubmitHandler<TLoginForm> = (data) => {
        login(data);
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="username"
                render={({ field }) => (
                    <Input {...field} placeholder="Enter login" />
                )}
            />
            <Controller
                control={control}
                name="password"
                render={({ field }) => (
                    <Input {...field} placeholder="Enter password" />
                )}
            />
            <Button type="submit">Login</Button>
        </StyledForm>
    );
};

export { Login };
