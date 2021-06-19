import Modal from "react-modal";
import React from "react";
import { useAppContext } from "../../helpers/functions/context";
import "./index.scss";

const StatsModal = ({ onRequestClose, setSettingsModalVisible, ...props }) => {
    const { imageTheme, statistics } = useAppContext();
    const { win, lose, averageTime, storage } = statistics;

    const handleCloseClick = () => {
        onRequestClose();
        setSettingsModalVisible(true);
    };

    return (
        <Modal
            className="stats-modal modal"
            overlayClassName="modal__overlay"
            ariaHideApp={false}
            {...props}
        >
            <div className="modal__header">
                <h2 className="modal__title text">Statistics</h2>
                <div className="modal__close">
                    <img
                        src={imageTheme?.close}
                        onClick={handleCloseClick}
                        alt=""
                    />
                </div>
            </div>
            <div className="modal__content">
                <div className="modal__field">
                    <span className="text">Win</span>
                    <span className="text">{win}</span>
                </div>
                <div className="modal__field">
                    <span className="text">lose</span>
                    <span className="text">{lose}</span>
                </div>
                <div className="modal__field">
                    <span className="text">averageTime</span>
                    <span className="text">{averageTime.toFixed(2)}</span>
                </div>
                {storage.length > 0 && (
                    <>
                        <h3 className="modal__table-title text">
                            Last 5 games:
                        </h3>
                        <div className="modal__field">
                            <table className="modal__table">
                                <thead>
                                    <tr>
                                        <th>№</th>
                                        <th>Result</th>
                                        <th>Time</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...storage]
                                        .reverse()
                                        .map((record, index) => {
                                            return (
                                                index < 5 && (
                                                    <tr key={record.id}>
                                                        <td>{record.id + 1}</td>
                                                        <td>{record.result}</td>
                                                        <td>{record.time}</td>
                                                        <td>{record.date}</td>
                                                    </tr>
                                                )
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default StatsModal;
