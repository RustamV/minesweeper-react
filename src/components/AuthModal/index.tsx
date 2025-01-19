import { useState } from "react";
import { Button } from "../Button/styles";
import {
    ModalClose,
    ModalContent,
    ModalHeader,
    ModalTitle,
} from "../Modal/styles";
import { Content, StyledModal } from "./styles";
import { useTranslation } from "react-i18next";
import { Login } from "./Login";
import { Register } from "./Register";
import { useTheme } from "../../stores/theme";
import { useAuthModal } from "../../stores/modal";

enum AuthState {
    Auth = "auth",
    Login = "login",
    Register = "register",
}

const AuthModal = () => {
    const { t } = useTranslation("app");
    const { imageTheme } = useTheme();
    const [authState, setAuthState] = useState(AuthState.Auth);
    const { closeModal, isOpen } = useAuthModal();

    const handleLoginClick = () => {
        setAuthState(AuthState.Login);
    };

    const handleRegisterClick = () => {
        setAuthState(AuthState.Register);
    };

    const handleCloseClick = () => {
        closeModal();
    };

    const handleGetBack = () => {
        setAuthState(AuthState.Auth);
    };

    return (
        <StyledModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className="modal"
            overlayClassName="modal-overlay"
            ariaHideApp={false}
        >
            <ModalHeader>
                {authState !== AuthState.Auth && (
                    <ModalClose>
                        <img
                            src={imageTheme?.close}
                            onClick={handleGetBack}
                            alt=""
                        />
                    </ModalClose>
                )}

                <ModalTitle>Auth</ModalTitle>
                <ModalClose>
                    <img
                        src={imageTheme?.close}
                        onClick={handleCloseClick}
                        alt=""
                    />
                </ModalClose>
            </ModalHeader>
            <ModalContent>
                {authState === AuthState.Auth ? (
                    <Content>
                        <Button onClick={handleLoginClick}>{t("login")}</Button>
                        <Button onClick={handleRegisterClick}>
                            {t("register")}
                        </Button>
                    </Content>
                ) : authState === AuthState.Login ? (
                    <>
                        <Login />
                    </>
                ) : (
                    <>
                        <Register />
                    </>
                )}
            </ModalContent>
        </StyledModal>
    );
};

export { AuthModal };
