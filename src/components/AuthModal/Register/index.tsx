import { FC } from "react";
import { Input } from "../../Input";
import { Button } from "../../Button/styles";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyledForm } from "./styles";
import { useAuthStore } from "../../../stores/auth";

interface Props {
    max?: number;
}

type TRegisterForm = {
    username: string;
    password: string;
};

const Register: FC<Props> = () => {
    const { handleSubmit, control } = useForm<TRegisterForm>();
    const { register } = useAuthStore();

    const onSubmit: SubmitHandler<TRegisterForm> = (data) => {
        register(data);
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
            <Button type="submit">Register</Button>
        </StyledForm>
    );
};

export { Register };
