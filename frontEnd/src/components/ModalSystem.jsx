import { Modal } from 'antd';

function ModalSystem({ title, open, children, onCancel, onOK }) {
    return (
        <Modal
            open={open}
            title={title}
            width={1000}
            onCancel={onCancel}
            onOk={onOK}
        >
            {children}
        </Modal>
    )
}

export default ModalSystem