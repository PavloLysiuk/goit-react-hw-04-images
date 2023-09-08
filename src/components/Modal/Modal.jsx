import ReactModal from 'react-modal';

export const Modal = ({ image, onClose, isOpen }) => {
  const { largeImageURL, tags } = image;
  const styles = {
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '2',
      backgroundColor: 'rgba(255,255,255,0.35)',
      backdropFilter: 'blur(12px)',
    },
    content: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: 'calc(100vw - 60px)',
      maxHeight: 'calc(100vh - 60px)',
      padding: '0',
      border: 'none',
      borderRadius: '16px',
      position: 'revert',
      overflow: 'hidden',
    },
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={styles}
      preventScroll={true}
    >
      <img src={largeImageURL} alt={tags} />
    </ReactModal>
  );
};
