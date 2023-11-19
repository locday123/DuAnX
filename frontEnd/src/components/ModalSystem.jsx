import { Modal } from 'antd';

function ModalSystem({ title, open, onCancel, children, width}) {

    return (
        <Modal
            open={open}
            title={title}
            width={width}
            centered
            footer={false}
            destroyOnClose
            maskStyle={{zIndex:1000}}
            onCancel={onCancel}
        >
            {children}
        </Modal>
    )
}

export default ModalSystem