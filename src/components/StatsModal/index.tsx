import { useTranslation } from "react-i18next";
import {
    ModalClose,
    ModalContent,
    ModalField,
    ModalHeader,
    ModalTable,
    ModalTableTitle,
    ModalTitle,
} from "../Modal/styles";
import { Text } from "../Text/styles";
import { StyledModal } from "../SettingsModal/styles";
import { useTheme } from "../../stores/theme";
import { Result, useStatistics } from "../../stores/statistics";
import { useSettingsModal, useStatisticsModal } from "../../stores/modal";
import i18n from "../../../i18n";
import { useEffect } from "react";

const endGameOptions = [
    { id: 0, result: Result.WIN, label: i18n.t("win") },
    { id: 1, result: Result.LOSE, label: i18n.t("lose") },
];

const StatisticsModalInner = () => {
    const { imageTheme } = useTheme();
    const { statistics, records, getStatistics } = useStatistics();
    const { t } = useTranslation("app");
    const { win, lose, averageTime } = statistics;
    const { closeModal, isOpen } = useStatisticsModal();
    const { openModal } = useSettingsModal();

    useEffect(() => {
        getStatistics();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCloseClick = () => {
        closeModal();
        openModal();
    };

    const findEndGameOption = (result: Result) => {
        return endGameOptions?.find((item) => item.result === result)?.label;
    };

    return (
        <StyledModal
            isOpen={isOpen}
            className="stats-modal modal"
            overlayClassName="modal-overlay"
            ariaHideApp={false}
        >
            <ModalHeader>
                <ModalTitle>{t("statistics")}</ModalTitle>
                <ModalClose>
                    <img
                        src={imageTheme?.close}
                        onClick={handleCloseClick}
                        alt=""
                    />
                </ModalClose>
            </ModalHeader>
            <ModalContent>
                <ModalField>
                    <Text>{t("win")}</Text>
                    <Text>{win}</Text>
                </ModalField>
                <ModalField>
                    <Text>{t("lose")}</Text>
                    <Text>{lose}</Text>
                </ModalField>
                <ModalField>
                    <Text>{t("averageTime")}</Text>
                    <Text>{averageTime.toFixed(2)}</Text>
                </ModalField>
                {records.length > 0 && (
                    <>
                        <ModalTableTitle>{t("lastGames")}</ModalTableTitle>
                        <ModalField>
                            <ModalTable>
                                <thead>
                                    <tr>
                                        <th>{t("number")}</th>
                                        <th>{t("result")}</th>
                                        <th>{t("time")}</th>
                                        <th>{t("date")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...records]
                                        .reverse()
                                        .map((record, index) => {
                                            return (
                                                index < 10 && (
                                                    <tr key={record.id}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {findEndGameOption(
                                                                record.result
                                                            )}
                                                        </td>
                                                        <td>{record.time}</td>
                                                        <td>{record.date}</td>
                                                    </tr>
                                                )
                                            );
                                        })}
                                </tbody>
                            </ModalTable>
                        </ModalField>
                    </>
                )}
            </ModalContent>
        </StyledModal>
    );
};

const StatisticsModal = () => {
    const { isOpen } = useStatisticsModal();

    if (!isOpen) {
        return null;
    }

    return <StatisticsModalInner />;
};

export { StatisticsModal };
