import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
	const { title, content, action, onDismiss } = props;
	return ReactDOM.createPortal(
		<div onClick={onDismiss} className='ui dimmer modals visible active'>
			<div onClick={(e) => e.stopPropagation()} className='ui standard modal visible active'>
				<div className='header'>{title}</div>
				<div className='content'>{content}</div>
				<div className='actions'>{action}</div>
			</div>
		</div>,
		document.querySelector('#portal')
	);
};

export default Modal;
