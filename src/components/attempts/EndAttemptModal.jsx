import { Button, Modal } from 'flowbite-react';
import React, { useState } from 'react';


export function EndAttemptModal(props) {

    const { openModal, setOpenModal, onEndAttempt, userResponses } = props;

    return (
        <Modal show={openModal === 'endAttempt'} onClose={() => setOpenModal(undefined)}>
            <Modal.Header>Confirm Action</Modal.Header>
            <Modal.Body>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Are you sure you want to end this attempt? Make sure you have reviewed your answers as you will not be able to change them once the attempt has been submitted.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    setOpenModal(undefined);
                    onEndAttempt(userResponses);
                }}>Yes, End Attempt</Button>
                <Button color="gray" onClick={() => setOpenModal(undefined)}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
