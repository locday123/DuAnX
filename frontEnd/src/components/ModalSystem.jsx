import { Modal } from 'antd';

function ModalSystem({ title, open, onCancel, children}) {

    return (
        <Modal
            open={open}
            title={title}
            width={1000}
            centered
            destroyOnClose
            maskStyle={{zIndex:1000}}
            onCancel={onCancel}
        >
            {children}
        </Modal>
    )
}

export default ModalSystem