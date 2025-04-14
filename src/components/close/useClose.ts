import { useEffect } from 'react';

type TUseClose = {
    isOpen: boolean;
    onClose: () => void;
    rootRef: React.RefObject<HTMLElement>;
};

export function useClose({ isOpen, onClose, rootRef }: TUseClose) {
    useEffect(() => {
        if (! isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            const { target } = e;
            const isOutside = target instanceof Node &&
                              rootRef.current &&
                              ! rootRef.current.contains(target);
            if (isOutside) {
                onClose();
            }
        };

        const handleKeyEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyEscape);
        }
    }, [isOpen, onClose, rootRef]);
}