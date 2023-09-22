import { Modal } from 'antd';

function ModalSystem({ title, open, children, onCancel }) {
    return (
        <Modal
            open={open}
            title={title}
            width={1000}
            onCancel={onCancel}
            footer={null}
        >
            {children}
        </Modal>
    )
}

export default ModalSystem