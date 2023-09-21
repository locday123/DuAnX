import { Modal } from 'antd';

function ModalSystem({ title, open, children }) {
    return (
        <Modal
            open={open}
            title={title}
            width={1000}
            centered
        >
            {children}
        </Modal>
    )
}

export default ModalSystem